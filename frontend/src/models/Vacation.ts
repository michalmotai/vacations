import fileUpload from 'express-fileupload';

interface Vacation {
  vacationId: number;
  destination: string;
  description: string;
  startDate: Date;
  endDate: Date;
  price: number;
  photoName: string;
  photo: FileList;
  likesCount: number;
}
export default Vacation;
