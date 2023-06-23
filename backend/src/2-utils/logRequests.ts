import { Request, Response, NextFunction } from 'express';

const logRequest = (req: Request, res: Response, next: NextFunction) => {
  console.log(
    `request method: ${req.method}, Request Route: ${req.originalUrl}`
  );

  next();
};

export default logRequest;
