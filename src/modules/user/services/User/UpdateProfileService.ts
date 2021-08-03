import { injectable, inject } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import IUsersRepository from '@modules/user/repositories/IUserRepository';
import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import User from '@modules/user/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
  small_biography?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashCitizenProvider')
    private hashCitizenProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
    small_biography,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found.', 404);
    }

    const userWithUpdatedEmail = await this.usersRepository.findByEmail(email);

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user_id) {
      throw new AppError('E-mail already in use.', 409);
    }

    Object.assign(user, { name, email, small_biography });

    if (password && !old_password) {
      throw new AppError(
        'You need to inform the old password to set a new password.',
        404,
      );
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashCitizenProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old password does not match.', 409);
      }

      user.password = await this.hashCitizenProvider.generateHash(password);
    }

    await this.cacheProvider.invalidate('users-list');
    
    return this.usersRepository.save(user);
  }
}
