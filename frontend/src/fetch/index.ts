import Vacation from '../models/Vacation';
import axios from '../axios';

export const getVacations = async (): Promise<Vacation[]> => {
  const response = await axios.get<Vacation[]>('/vacations');

  return response.data;
};

export const getVacationsById = async (
  vacationId: number
): Promise<Vacation> => {
  const response = await axios.get<Vacation>(`/vacations/${vacationId}`);

  return response.data;
};

export const getVacationsbyDestination = async (
  destination: string
): Promise<Vacation[]> => {
  const response = await axios.get<Vacation[]>(`/vacations/${destination}`);
  return response.data;
};

export const addVacation = async (vacation: Vacation): Promise<Vacation> => {
  // AJAX request - sending a new vacation to the server / receiving  back the added vacation

  // const response = await axios.post(`/vacations/`,vacation); // sending object with binary (without files);

  const formData = new FormData(); // can contain string and / or files
  formData.append('destination', vacation.destination);
  formData.append('description', vacation.description);
  formData.append('startDate', new Date(vacation.startDate).toISOString());
  formData.append('endDate', new Date(vacation.endDate).toISOString());
  formData.append('price', vacation.price.toString());
  formData.append('photoName', vacation.photoName[0]); //image = FileList image[0] = File  / Blob

  // console.log(vacation);

  const response = await axios.post<Vacation>(
    `/vacations`,
    formData
  );

  const addedVacation = response.data;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(addedVacation);
    }, 1500);
  });
};

export const updateVacation = async (vacation: Vacation): Promise<Vacation> => {
  // AJAX request - sending a new vacation to the server / receiving  back the added vacation

  // const response = await axios.post(`/vacations/`,vacation); // sending object with binary (without files);

  const formData = new FormData(); // can contain string and / or files
  formData.append('destination', vacation.destination);
  formData.append('description', vacation.description);
  formData.append('price', vacation.price.toString());
  formData.append('startDate', vacation.startDate.toISOString());
  formData.append('endDate', vacation.endDate.toISOString());
  formData.append('photoName', vacation.photoName[0]); //image = FileList image[0] = File  / Blob

  const response = await axios.post<Vacation>(
    `/vacations`,
    formData
  );

  const addedvacation = response.data;

  return new Promise((resolve, reject) => {
    resolve(addedvacation);
  });
};

// export const deleteVacation = async (id: number): Promise<boolean> => {
//   const response = await axios.delete<Vacation>(`/vacations/${id}`);

//   return new Promise((resolve, reject) => {
//     resolve(true);
//   });
// };
export const deleteVacation = async (id: number): Promise<boolean> => {
  try {
    await axios.delete(`/vacations/${id}`);
    return true;
  } catch (error) {
    // Handle error
    console.log(error);
    return false;
  }
};
