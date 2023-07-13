import Vacation from '../4-models/Vacation';
import { v4 as uuid } from 'uuid';
import path from 'path';

export const saveImageToImagesFolder = async (vacation: Vacation) => {
  if (vacation.photo) {
    try {
      const extension = vacation.photo.name.split('.').pop();
      vacation.photoName = `${uuid()}.${extension}`;
      await vacation.photo.mv(`${imagesAbseloutePath}/${vacation.photoName}`);
    } catch (error) {
      // Handle or log the error appropriately
      console.error('Error saving image:', error);
      throw error;
    }
  }
};
export const imagesAbseloutePath = path.join(
  __dirname,
  '..',
  '1-assets',
  'images'
);
