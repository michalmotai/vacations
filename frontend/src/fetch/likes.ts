import axios from '../axios';
import Vacation from '../models/Vacation';

export const isLikedAsync = async (
  userId: number,
  vacationId: number
): Promise<boolean> => {
  try {
    const response = await axios.get(
      `/vacations/${vacationId}/likes/${userId}`
    );
    console.log('fetch isLikedAsync');

    return response.data;
  } catch (error) {
    console.error('Error in isLikedAsync:', error);
    throw error;
  }
};

export const getVacationLikedByUserIdAsync = async (
  userId: number
): Promise<Vacation[]> => {
  try {
    const response = await axios.get(`/vacations/${userId}/likes`);
    console.log('fetch getVacationLikedByUserIdAsync');

    return response.data;
  } catch (error) {
    console.error('Error in getVacationLikedByUserIdAsync:', error);
    throw error;
  }
};

export const addLikeToVacationAsync = async (
  userId: number,
  vacationId: number
): Promise<void> => {
  try {
    const response = await axios.post(
      `/vacations/${userId}/likes/${vacationId}`
    );
    console.log('fetch addLikeToVacationAsync');
    return response.data;
  } catch (error) {
    console.error('Error in addLikeToVacationAsync:', error);
    throw error;
  }
};

export const deleteLikeToVacationAsync = async (
  userId: number,
  vacationId: number
): Promise<void> => {
  try {
    const response = await axios.delete(
      `/vacations/${userId}/likes/${vacationId}`
    );
    console.log('fetch deleteLikeToVacationAsync');

    return response.data;
  } catch (error) {
    console.error('Error in deleteLikeToVacationAsync:', error);
    throw error;
  }
};

export const getLikesPerVacation = async (): Promise<
  { vacationId: number; likesCount: number }[]
> => {
  try {
    const response = await axios.get(`/vacations/likes`);
    console.log('fethed likes per vacation');
    return response.data;
  } catch (error) {
    console.error('Error in getLikesPerVacation:', error);
    throw error;
  }
};
