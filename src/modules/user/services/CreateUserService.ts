import { injectable, inject } from 'tsyringe';

import AppError from '@/shared/infra/http/errors/AppError';

import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUserRepository';

export interface IRequest {
  name: string;
  email: string;
  password: string;
  is_tourist: boolean;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
  ) {}

  public async execute({
    name,
    email,
    password,
    is_tourist,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const user = this.usersRepository.create({
      name,
      email,
      password,
      is_tourist,
    });

    return user;
  }
}
