import { getRepository, Repository } from 'typeorm';

import IUserRepository from '@modules/user/repositories/IUserRepository';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

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

  public async create(userData: ICreateUserDTO): Promise<User> {
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
