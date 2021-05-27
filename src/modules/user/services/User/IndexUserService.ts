import { inject, injectable } from 'tsyringe';

import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../../repositories/IUserRepository';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAllUsers();

    return users;
  }
}
