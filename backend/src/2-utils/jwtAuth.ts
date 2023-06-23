import User from '../4-models/User';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

export const generateToken = (user: User) => {
  //create container for user object
  const container = { user };

  //create expiration time
  const options = { expiresIn: '3h' };

  //generate token
  const secretToken = process.env.JWT_SECRET_KEY;
  //

  return jwt.sign(container, `${secretToken}`, options);
};
