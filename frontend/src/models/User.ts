import Vacation from './Vacation';

interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  birthday: Date;
  role: Role;
  likedVacations: Vacation[];
}

enum Role {
  User = 'user',
  Admin = 'admin',
}

export default User;
