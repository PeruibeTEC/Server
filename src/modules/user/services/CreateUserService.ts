import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

export interface IRequest {
  name: string;
  email: string;
  password: string;
  is_tourist: boolean;
  photo: string;
  small_biography?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    is_tourist,
    photo,
    small_biography,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (!photo) {
      photo =
        'https://peruibetec.blob.core.windows.net/user-images/default.jpg';
    }

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      is_tourist,
      photo,
      small_biography,
    });

    return user;
  }
}
