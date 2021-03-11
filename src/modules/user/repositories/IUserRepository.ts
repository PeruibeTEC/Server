import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
  save(user: ICreateUserDTO): Promise<User>;
}
