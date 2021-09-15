import { inject, injectable } from 'tsyringe';
import { addHours, isAfter } from 'date-fns';
import AppError from '@shared/infra/http/errors/AppError';

import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import IUserRepository from '../../repositories/IUserRepository';
import ITokenRepository from '../../repositories/ITokenRepository';

interface IRequest {
  new_password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: ITokenRepository,

    @inject('HashProvider')
    private hashCitizenProvider: IHashProvider,
  ) {}

  public async execute({ token, new_password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('User token does not exist', 404);
    }

    const user = await this.usersRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError('User does not exist', 404);
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired', 401);
    }

    user.password = await this.hashCitizenProvider.generateHash(new_password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
