import IUserRepository from '@modules/user/repositories/IUserRepository';
import auth from '@shared/infra/http/config/auth';
import AppError from '@shared/infra/http/errors/AppError';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import User from '../../infra/typeorm/entities/User';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  tourist: User;
  token: string;
}

@injectable()
class AuthenticateTouristService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const tourist = await this.usersRepository.findByEmail(email);
    if (!tourist) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (tourist.is_tourist === false) {
      throw new AppError('The user is not a tourist', 401);
    }

    const passwordMatched = await compare(password, tourist.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { tourist_secret, expiresIn } = auth.jwt;

    // veryfing if secret is undefined (otherwise the sign method won't work)
    if (tourist_secret === undefined) {
      throw new AppError('Invalid secret');
    } else {
      const token = sign({}, tourist_secret, {
        subject: tourist.id,
        expiresIn,
      });

      return {
        tourist,
        token,
      };
    }
  }
}

export default AuthenticateTouristService;
