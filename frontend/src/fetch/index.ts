import Vacation from '../models/Vacation';
import axios from '../axios';

export const getVacations = async (): Promise<Vacation[]> => {
  try {
    const response = await axios.get<Vacation[]>('/vacations');
    return response.data;
  } catch (error) {
    console.error('Error in getVacations:', error);
    throw error;
  }
};

export const getVacationsById = async (
  vacationId: number
): Promise<Vacation> => {
  try {
    const response = await axios.get<Vacation>(`/vacations/${vacationId}`);
    return response.data;
  } catch (error) {
    console.error('Error in getVacationsById:', error);
    throw error;
  }
};

export const getVacationsbyDestination = async (
  destination: string
): Promise<Vacation[]> => {
  try {
    const response = await axios.get<Vacation[]>(`/vacations/${destination}`);
    return response.data;
  } catch (error) {
    console.error('Error in getVacationsbyDestination:', error);
    throw error;
  }
};

export const addVacation = async (vacation: Vacation): Promise<Vacation> => {
  try {
    const formData = new FormData();
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', new Date(vacation.startDate).toISOString());
    formData.append('endDate', new Date(vacation.endDate).toISOString());
    formData.append('price', vacation.price.toString());
    formData.append('photoName', vacation.photoName[0]);

    const response = await axios.post<Vacation>(`/vacations`, formData);
    const addedVacation = response.data;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(addedVacation);
      }, 1500);
    });
  } catch (error) {
    console.error('Error in addVacation:', error);
    throw error;
  }
};

export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  try {
    const formData = new FormData();
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('price', vacation.price.toString());
    formData.append('startDate', vacation.startDate.toISOString());
    formData.append('endDate', vacation.endDate.toISOString());
    formData.append('photoName', vacation.photoName[0]);

    const response = await axios.post<Vacation>(`/vacations`, formData);
    const addedVacation = response.data;

    return new Promise((resolve, reject) => {
      resolve(addedVacation);
    });
  } catch (error) {
    console.error('Error in updateVacation:', error);
    throw error;
  }
};

export const deleteVacation = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`/vacations/${id}`);
    return true;
  } catch (error) {
    console.error('Error in deleteVacation:', error);
    throw error;
  }
};
