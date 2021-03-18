import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

export interface IRequest {
  id: string;
}

@injectable()
export default class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<User> {
    const userFrom = await this.usersRepository.findById(id);

    if (!userFrom) {
      throw new AppError('User does not exists.', 404);
    }

    return userFrom;
  }
}
