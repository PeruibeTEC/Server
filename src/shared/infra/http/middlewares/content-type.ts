import { Request, Response, NextFunction } from 'express';

export const contentType = (
  request: Request,
  response: Response,
  nextFunction: NextFunction,
): void => {
  response.type('json');
  nextFunction();
};
