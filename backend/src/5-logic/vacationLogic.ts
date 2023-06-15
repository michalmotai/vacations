import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { ResourceNotFoundError, ValidationError } from '../4-models/Error';
import Vacation from '../4-models/Vacation';

//get all vacations, order by start date, limit to 10 per page
export const getAllVacations = async (
  pageNumber: number
): Promise<Vacation[]> => {
  try {
    const pageSize = 10; //number of queries per page
    const offset = (pageNumber - 1) * pageSize;
    const sql = `SELECT * FROM vacations_table
    ORDER BY startDate
    LIMIT 10 OFFSET ${offset} `;
    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

//get one vacation
export const getVacation = async (vacationId: number): Promise<Vacation> => {
  try {
    const sql = `SELECT * FROM vacations_table
        WHERE vacationId = vacationId;`;
    return await dal.execute<Vacation>(sql);
  } catch (error) {
    throw error;
  }
};

//delete vacation
export const deleteVacation = async (id: number): Promise<void> => {
  try {
    const sql = `DELETE FROM vacations_table
    WHERE VacationId = id;`;
    const info = await dal.execute<OkPacket>(sql);

    if (info.affectedRows === 0) {
      throw new ResourceNotFoundError(id);
    }
  } catch (error) {
    throw error;
  }
};

//add new vacation
export const addVacation = async (vacation: Vacation): Promise<Vacation> => {
  //validation
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  const { destination, description, startDate, endDate, price, photoName } =
    vacation;

  const sql = `INSERT INTO vacations_table VALUES(
        DEFAULT, '${destination}','${description}', '${startDate}','${endDate}', ${price},'${photoName}');`;

  const info = await dal.execute<OkPacket>(sql);
  vacation.vacationId = info.insertId;
  return vacation;
};

//update vacation
export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  //validation
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  const {
    vacationId,
    destination,
    description,
    startDate,
    endDate,
    price,
    photoName,
  } = vacation;
  const sql = `UPDATE vacations_table SET
     destination = '${destination}',
     description = '${description}',
     startDate =' ${startDate}',
     endDate = '${endDate}',
     price = ${price},
     photoName = '${photoName}'
     WHERE vacationId = ${vacationId}
    `;

  //execute
  const info = await dal.execute<OkPacket>(sql);

  //if not exist
  if (info.affectedRows === 0) {
    throw new ResourceNotFoundError(vacationId);
  }
  return vacation;
};

//filter vacations by startdate
export const getVactionByDate = async (
  startDate: Date,
  endDate: Date
): Promise<Vacation[]> => {
  try {
    const sql = `SELECT *
    FROM vacations_table
    WHERE startDate > '${startDate}'`;
    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

//filter vacations which are active at current date
export const getActiveVactions = async (
  startDate: Date,
  endDate: Date
): Promise<Vacation[]> => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    const sql = `SELECT *
    FROM vacations_table
    WHERE startDate >= '${currentDate}'
      AND endDate <= '${currentDate}';`;
    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

export default { getAllVacations, getVactionByDate, getActiveVactions };
