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
    formData.append('photo', vacation.photo[0]);

    const response = await axios.post<Vacation>(`/vacations`, formData);
    const addedVacation = response.data;
    return addedVacation;
  } catch (error) {
    console.error('Error in addVacation:', error);
    throw error;
  }
};

export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  try {
    console.log('previous vacation:', vacation);
    const vacationId = vacation.vacationId; // Assuming vacationId is a property of the Vacation object
    const formData = new FormData();
    formData.append('destination', vacation.destination);
    formData.append('description', vacation.description);
    formData.append('startDate', new Date(vacation.startDate).toISOString());
    formData.append('endDate', new Date(vacation.endDate).toISOString());
    formData.append('price', vacation.price.toString());
    formData.append('photo', vacation.photo[0]);

    // // Check if a new photo file is selected
    // if (vacation.photo) {
    //   const photoFile = vacation.photo[0];
    //   formData.append('photo', photoFile);
    // }
    console.log('payload:', formData);
    // Make the PATCH request to update the vacation details
    const response = await axios.patch<Vacation>(
      `/vacations/${vacationId}`,
      formData
    );
    const updatedVacation = response.data;

    // Fetch the updated photo from the server and update the vacation object
    if (updatedVacation.photoName) {
    }
    //add code
    // const photoResponse =

    return updatedVacation;
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
export const filterVacationByStartDateAsync = async (): Promise<Vacation[]> => {
  try {
    const response = await axios.get('/vacations/start');
    console.log('filterVacationByStartDateAsync');
    return response.data;
  } catch (error) {
    console.error('Error in filterVacationByStartDate:', error);
    throw error;
  }
};

export const filterVacationsByActiveAsync = async (): Promise<Vacation[]> => {
  try {
    const response = await axios.get('/vacations/active');
    console.log('filterVacationsByActiveAsync');
    return response.data;
  } catch (error) {
    console.error('Error in filterVacationsByActive:', error);
    throw error;
  }
};

