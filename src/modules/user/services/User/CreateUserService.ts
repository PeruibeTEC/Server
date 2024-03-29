import { inject, injectable } from 'tsyringe';
import { azureCreate } from '@shared/infra/azure/imageStorage/imageUpload';
import AppError from '@shared/infra/http/errors/AppError';

import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import User from '../../infra/typeorm/entities/User';
import IUserRepository from '../../repositories/IUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

export interface IRequest {
  name: string;
  email: string;
  password: string;
  is_tourist: boolean;
  photo: string;
  background_photo: string;
  small_biography?: string;
}

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashCitizenProvider')
    private hashCitizenProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
    is_tourist,
    photo,
    background_photo,
    small_biography,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashCitizenProvider.generateHash(
      password,
    );

    if (photo === undefined) {
      photo =
        'https://peruibetec.blob.core.windows.net/user-images/default.jpg';
    } else {
      photo = azureCreate('user-images', photo);
    }

    if (background_photo) {
      background_photo = azureCreate('background-photo', background_photo);
    } else {
      // eslint-disable-next-line no-unused-expressions
      background_photo === null;
    }

    const user = this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      is_tourist,
      photo,
      background_photo,
      small_biography,
    });

    await this.cacheProvider.invalidate('users-list');

    return user;
  }
}
