import { Request, Response, NextFunction } from 'express';
import striptags from 'striptags';

const sanitize = (request: Request, response: Response, next: NextFunction) => {
  for (const prop in request.body) {
    if (typeof request.body[prop] === 'string') {
      request.body[prop] = striptags(request.body[prop]);
    }
  }

  next();
};

export default sanitize;
