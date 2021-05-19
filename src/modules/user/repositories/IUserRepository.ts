<<<<<<< HEAD
import IUserDTO from '../dtos/IUserDTO';
=======
import ICreateUserDTO from '../dtos/IUserDTO';
>>>>>>> main
import User from '../infra/typeorm/entities/User';

export default interface IUserRepository {
  findAllUsers(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  create(data: IUserDTO): Promise<User>;
  delete(id: string): Promise<string>;
<<<<<<< HEAD
  save(user: IUserDTO): Promise<User>;
=======
  save(user: User): Promise<User>;
>>>>>>> main
}
