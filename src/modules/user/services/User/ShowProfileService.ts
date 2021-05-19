<<<<<<< HEAD:src/modules/user/services/User/ShowProfileService.ts
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../../repositories/IUserRepository';
=======
import AppError from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
>>>>>>> main:src/modules/user/services/ShowLoggedUserService.ts

export interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowLoggedUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User> {
    const userFrom = await this.usersRepository.findById(user_id);

    if (!userFrom) {
      throw new AppError('User does not exists.', 404);
    }

    return userFrom;
  }
}
