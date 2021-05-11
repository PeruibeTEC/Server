import ICreateUserDTO from '../dtos/IUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
  save(user: User): Promise<User>;
}
