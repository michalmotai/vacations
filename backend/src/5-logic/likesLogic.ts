import dal from '../2-utils/dal';
import Vacation from '../4-models/Vacation';

//get liked vacation by userId
export const getVacationLikedByUserId = async (
  userId: number
): Promise<Vacation[]> => {
  try {
    const sql = `
    SELECT Likes.userId, Likes.vacationId, v.destination, v.description, v.startDate, v.endDate, v.price, v.photoName
FROM Likes
INNER JOIN vacations_table AS v ON Likes.vacationId = v.vacationId
WHERE Likes.userId  = ${userId};`;

    return await dal.execute<Vacation[]>(sql);
  } catch (error) {
    throw error;
  }
};

export const checkIfUserLikedVacation = async (
  userId: number,
  vacationId: number
): Promise<boolean> => {
  try {
    const sql = `SELECT * FROM likes WHERE userId = ${userId} AND vacationId = ${vacationId}`;
    const likes = await dal.execute<any[]>(sql);
    return likes.length > 0;
  } catch (error) {
    throw error;
  }
};

//post like to vacation by userId
export const addVacationLikeByUserId = async (
  userId: number,
  vacationId: number
): Promise<void> => {
  try {
    const sql = `INSERT INTO likes (userId, vacationId)
      VALUES (${userId}, ${vacationId})
      `;
    return await dal.execute(sql);
  } catch (error) {
    throw error;
  }
};

//delete like to vacation by userId
export const deleteVacationLikeByUserId = async (
  userId: number,
  vacationId: number
): Promise<void> => {
  try {
    const sql = `DELETE FROM likes WHERE userId = ${userId} AND vacationId = ${vacationId};`;
    return await dal.execute(sql);
  } catch (error) {
    throw error;
  }
};

//get liked vacation by vacationId
export const getLikesCountPerVacation = async (): Promise<any> => {
  try {
    const sql = `SELECT vacationId, COUNT(*) as likesCount FROM likes GROUP BY vacationId`;
    return await dal.execute(sql);
  } catch (error) {
    throw error;
  }
};
