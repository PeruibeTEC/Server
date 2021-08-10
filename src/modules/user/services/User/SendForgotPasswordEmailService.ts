import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import path from 'path';

import IMailProvider from '@shared/container/providers/AmazonSESProvider/models/IMailProvider';
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

    @inject('AmazonSESMailProvider')
    private mailProvider: IMailProvider,

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'view',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[PeruibeTec]: Recuperação de Senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          token,
          // TODO: put environment variable to server path in production
          link: `http://localhost:3333/password/reset?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
