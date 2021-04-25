import ICreateUserDTO from '../dtos/IUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findAllUsers(expect_user_id?: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
  save(user: ICreateUserDTO): Promise<User>;
}
