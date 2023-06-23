import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../4-models/User';
import { UnauthorizedError } from '../4-models/Error';

//adding the user to the request object
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

const verifyLogin = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  //const auth = 'Bearer sdfsfhsafsdf' we need to extract the token
  const token = request.headers.authorization?.split(' ')[1];

  if (!token) {
    const error = new UnauthorizedError('unauthorized');
    next(error);
    return;
  }

  //verify the jwt

  jwt.verify(token, `${process.env.JWT_SECRET_KEY}`, (error, decoded) => {
    if (error) {
      //jwt in not valid
      console.log('unautherized');
      const error = new UnauthorizedError('unautherized');
      next(error);
    } else {
      //jwt is valid, save the decoded payload inside the request
      request.user = decoded as User;
      next();
    }
  });
};

export default verifyLogin;
