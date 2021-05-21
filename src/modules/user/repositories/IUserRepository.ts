import IUserDTO from '../dtos/IUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
  save(user: IUserDTO): Promise<User>;
}
