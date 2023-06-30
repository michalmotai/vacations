import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { generateToken } from '../2-utils/jwtAuth';
import User, { Role } from '../4-models/User';
import {
  ResourceNotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../4-models/Error';
import Credentials from '../4-models/Credentails';
import bcrypt from 'bcrypt';

export const register = async (user: User): Promise<string> => {
  //validation

  //is the username taken
  const existingUser = await getUserByEmail(user.email);
  if (existingUser) {
    throw new Error('Email is already in use.');
  }

  //define new user as a User role
  user.role = Role.user;

  //validation
  const error = user.validate();
  if (error) {
    throw new ValidationError(error);
  }

  const { firstName, lastName, email, password, birthday } = user;
  //create a hash password
  const saltRounds = 10;

  const hashPassword = async (password: string): Promise<string> => {
    try {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPassword = await bcrypt.hash(password, salt);
      return hashedPassword;
    } catch (error) {
      throw error;
    }
  };
  const hashedPassword = await hashPassword(password);

  //reformat dates
  // const formatedBirthday = new Date(birthday).toISOString().split('T')[0];
  user.role = Role.user;

  const sql = `INSERT INTO users (userId, firstName, lastName, email, password, birthday, role)
  VALUES (DEFAULT,'${firstName}', '${lastName}', '${email}', '${hashedPassword}', '${birthday}','${user.role}')`;

  const info = await dal.execute<OkPacket>(sql);
  user.userId = info.insertId;

  //generate token
  return generateToken(user);
};

export const login = async (credentials: Credentials): Promise<string> => {
  //validate
  const error = credentials.validate();
  if (error) {
    throw new ValidationError(error);
  }

  // get user by email
  const user = await getUserByEmail(credentials.email);

  // if user does not exist or password does not match - checking hashed password
  if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
    throw new UnauthorizedError('Incorrect email or password');
  }

  // generate token
  return generateToken(user);
};
//get all users
export const getAllUsers = async (): Promise<User[]> => {
  try {
    const sql = `SELECT * FROM users;`;
    return await dal.execute<User[]>(sql);
  } catch (error) {
    throw error;
  }
};

//get one user
export const getUser = async (userId: number): Promise<User> => {
  try {
    const sql = `SELECT * FROM users WHERE userId = ${userId};`;
    return await dal.execute<User>(sql);
  } catch (error) {
    throw error;
  }
};

//delete user
export const deleteUser = async (userId: number): Promise<void> => {
  try {
    const sql = `DELETE FROM users
  WHERE userId = ${userId};`;
    const info = await dal.execute<OkPacket>(sql);
    if (info.affectedRows === 0) {
      throw new ResourceNotFoundError(userId);
    }
  } catch (error) {
    throw error;
  }
};

// get user by email
export const getUserByEmail = async (email: string): Promise<User | null> => {
  const sql = `SELECT * FROM users WHERE email = '${email}';`;
  const users = await dal.execute<User[]>(sql);

  // return the first user if it exists, otherwise return null
  return users[0] || null;
};
