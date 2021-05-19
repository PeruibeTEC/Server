import { inject, injectable } from 'tsyringe';
<<<<<<< HEAD:src/modules/user/services/User/IndexUserService.ts
import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../../repositories/IUserRepository';
=======
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
>>>>>>> main:src/modules/user/services/IndexUserService.ts

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
