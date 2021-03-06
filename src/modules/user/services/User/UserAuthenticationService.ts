import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import auth from '@shared/infra/http/config/auth';
import AppError from '@shared/infra/http/errors/AppError';
import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../../repositories/IUserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    if (user.is_tourist === true) {
      throw new AppError('The user is not a citizen', 401);
    }

    const passwordMatched = await compare(password, user.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { secret, expiresIn } = auth.jwt;

    // veryfing if secret is undefined (otherwise the sign method won't work)
    if (secret === undefined) {
      throw new AppError('Invalid secret');
    } else {
      const token = sign({}, secret, {
        subject: user.id,
        expiresIn,
      });

      return {
        user,
        token,
      };
    }
  }
}

export default AuthenticateUserService;
