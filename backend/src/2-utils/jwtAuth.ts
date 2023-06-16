import User from '../4-models/User';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateToken = (user: User) => {
  //create container for user object
  const container = { user };

  //create expiration time
  const expiration = { expiration: '3h' };

  //generate token
  const secretToken = process.env.JWT_SECRET_KEY;
  //   jwt.sign(container, secretToken);
};
