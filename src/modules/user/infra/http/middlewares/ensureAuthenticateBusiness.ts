import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/infra/http/errors/AppError';
import auth from '@shared/infra/http/config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticateBusiness(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('JWT token is missing', 404);
  }

  const [, token] = authHeader.split(' ');

  try {
    // veryfing if secret is undefined (otherwise the verify method won't work)
    if (auth.jwt.business_secret === undefined) {
      throw new AppError('Invalid secret');
    } else {
      const decoded = verify(token, auth.jwt.business_secret);

      const { sub } = decoded as ITokenPayload;

      request.business = {
        id: sub,
      };

      return next();
    }
  } catch {
    throw new AppError('Invalid JWT token', 401);
  }
}
