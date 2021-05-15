import { getRepository, Not, Repository } from 'typeorm';

import IUserDTO from '@modules/user/dtos/IUserDTO';
import IUserRepository from '@modules/user/repositories/IUserRepository';
import User from '../entities/User';

export default class UserRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllUsers(expect_user_id?: string): Promise<User[]> {
    let users: User[];

    if (expect_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(expect_user_id),
        },
      });
    } else {
      users = await this.ormRepository.find();
    }
    return users;
  }

  public async create(userData: IUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `User_id: ${id} deleted`;
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}
