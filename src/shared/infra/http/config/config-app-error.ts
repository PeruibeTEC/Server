import logger from '@shared/utils/logger';

import { Express, NextFunction, Request, Response } from 'express';
import AppError from '../errors/AppError';

export default (app: Express): void => {
  app.use(
    (err: Error, request: Request, response: Response, _: NextFunction) => {
      if (err instanceof AppError) {
        return response.status(err.statusCode).json({
          status: 'error',
          message: err.message,
        });
      }

      logger.error(err);

      return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
      });
    },
  );
};
