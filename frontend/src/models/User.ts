import Vacation from './Vacation';

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthDate: Date;
  role: string;
  likedVacations: Vacation[];
}

export default User;
