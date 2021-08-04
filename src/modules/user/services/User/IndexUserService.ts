import { inject, injectable } from 'tsyringe';

import User from '../../infra/typeorm/entities/User';
import ICacheProvider from '../../../../shared/container/providers/CacheProvider/models/ICacheProvider';
import IUserRepository from '../../repositories/IUserRepository';
import { Console } from 'console';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<User[]> {
    let users = await this.cacheProvider.recover<User[]>(
      'users-list',
    );

    if (!users) {
      users = await this.usersRepository.findAllUsers();

      await this.cacheProvider.save('users-list', users);
    }

    return users;
  }
}
