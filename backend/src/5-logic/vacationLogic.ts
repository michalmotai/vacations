import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { ResourceNotFoundError, ValidationError } from '../4-models/Error';
import Vacation from '../4-models/Vacation';
import { saveImageToImagesFolder } from '../2-utils/vacation-utils';
import fs from 'fs';

const imageFolder = `./src/1-assets/images`;

// Function to format dates
const formatDate = (date: Date): string => {
  return new Date(date).toISOString().split('T')[0];
};

//get all vacations, order by start date, limit to 10 per page
export const getAllVacations = async (): // pageNumber: number
Promise<Vacation[]> => {
  try {
    const pageSize = 10; //number of queries per page

    //pageNumber - 1 -fix later
    // const offset = 0 * pageSize;
    const sql = `SELECT * FROM vacations_table
    ORDER BY startDate`;
    // LIMIT 10 OFFSET ${offset}
    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

//get one vacation
export const getVacation = async (vacationId: number): Promise<Vacation> => {
  try {
    const sql = `SELECT * FROM vacations_table
        WHERE vacationId = ?;`;
    return await dal.execute<Vacation>(sql, [vacationId]);
  } catch (error) {
    throw error;
  }
};

//delete vacation
export const deleteVacation = async (id: number): Promise<void> => {
  try {
    const sql = `DELETE FROM vacations_table
    WHERE vacationId = ${id};`;
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
  console.log('Received data:', vacation);

  //validation
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  let {
    destination,
    description,
    startDate,
    endDate,
    price,
    photo,
    photoName,
  } = vacation;

  // reformat dates
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  if (vacation.photo) {
    const photoName = await saveImageToImagesFolder(vacation);
    //vacation.photoName = photoName;
    console.log('vacationLogicIf', vacation.photoName);
    console.log(vacation);

    //delete the binary file from the vacation object
    delete vacation.photo;
  }

  const sql = `INSERT INTO vacations_table (vacationId, destination, description, startDate, endDate, price, photoName)
  VALUES (DEFAULT, '${destination}','${description}', '${formatedStartDate}','${formatedEndDate}', ${price},'${vacation.photoName}');`;

  const info = await dal.execute<OkPacket>(sql);
  vacation.vacationId = info.insertId;
  return vacation;
};

// Update vacation
export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  console.log('updateStart:', vacation);
  // Validation
  const error = vacation.validate();
  if (error) throw new ValidationError(error);

  // Get all vacations
  const vacations = await getAllVacations();

  // Find index of vacation
  const index = vacations.findIndex(
    (v) => v.vacationId === vacation.vacationId
  );
  const oldVacation = { ...vacations[index] };
  console.log('old vacation:', vacation);

  // Check if there is a photo in the object
  if (
    oldVacation.photoName &&
    fs.existsSync(`${imageFolder}/${oldVacation.photoName}`)
  ) {
    console.log(oldVacation.photoName);
    try {
      // If exists, delete it
      fs.unlink(`${imageFolder}/${oldVacation.photoName}`, (err) => {
        if (err) throw err;
        console.log('File was deleted:', oldVacation.photoName);
      });
    } catch (error) {
      throw new Error(`Couldn't delete file ${oldVacation.photoName}`);
    }
  }

  // Update with new vacation
  vacations[index] = vacation;

  if (vacation.photo) {
    const photoName = await saveImageToImagesFolder(vacation);

    // Delete the binary file from the vacation object
    delete vacation.photo;
  }

  const {
    vacationId,
    destination,
    description,
    startDate,
    endDate,
    price,
    photo,
    photoName,
  } = vacation;

  // Reformat dates
  const formatedStartDate = formatDate(startDate);
  const formatedEndDate = formatDate(endDate);

  const sql = `UPDATE vacations_table SET
      destination = '${destination}',
      description = '${description}',
      startDate = '${formatedStartDate}',
      endDate = '${formatedEndDate}',
      price = ${price},
      photoName = '${vacation.photoName}'
      WHERE vacationId = ${vacationId}`;

  // Execute
  const info = await dal.execute<OkPacket>(sql);

  // If not exist
  if (info.affectedRows === 0) {
    throw new ResourceNotFoundError(vacationId);
  }

  return vacation;
};

//filter vacations by startdate
export const getVactionByStartDate = async (): Promise<Vacation[]> => {
  try {
    const sql = `SELECT *
    FROM vacations_table
    WHERE startDate > CURDATE()`;
    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

//filter vacations which are active at current date
export const getActiveVactions = async (): Promise<Vacation[]> => {
  try {
    const sql = `SELECT * FROM vacations.vacations_table
    WHERE CURDATE() BETWEEN startDate AND endDate;`;

    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

export default { getAllVacations, getVactionByStartDate, getActiveVactions };
