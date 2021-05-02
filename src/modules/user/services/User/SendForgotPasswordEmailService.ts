import AppError from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../repositories/IUserRepository';
import ITokenRepository from '../../repositories/ITokenRepository';

interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('UserTokenRepository')
    private userTokenRepository: ITokenRepository,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Email does not exist', 404);
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    // here the email should be sent with token (waiting for SendEmailService)
    // console.log(token) is a placeholder
    // eslint-disable-next-line no-console
    console.log(token);
  }
}

export default SendForgotPasswordEmailService;
