import Vacation from '../4-models/Vacation';
import { v4 as uuid } from 'uuid';

export const saveImageToImagesFolder = async (vacation: Vacation) => {
  if (vacation.photo) {
    // Find the file type extension (.jpg/.png...)
    const extension = vacation.photo.name.split('.').pop();

    // Create a random file name
    vacation.photoName = `${uuid()}.${extension}`;
    await vacation.photo.mv(`./src/1-assets/images/${vacation.photoName}`);
  }
};
