import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import IUserRepository from '../../repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export interface IRequest {
  user_id: string;
}

@injectable()
export default class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<void> {
    const userFrom = await this.usersRepository.findById(user_id);

    if (!userFrom) {
      throw new AppError('User does not exists.', 404);
    }

    await this.cacheProvider.invalidate('users-list');

    await this.usersRepository.delete(userFrom.id);
  }
}
