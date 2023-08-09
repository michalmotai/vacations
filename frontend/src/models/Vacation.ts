import fileUpload from 'express-fileupload';

interface Vacation {
  vacationId: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  photoName: string;
  photo: FileList;
  likesCount: number;
}
export default Vacation;
