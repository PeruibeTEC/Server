import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: IUserTokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email does not exist', 404);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    // here the email should be sent with token (waiting for SendEmailService)
    // console.log(token) is a placeholder

    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
