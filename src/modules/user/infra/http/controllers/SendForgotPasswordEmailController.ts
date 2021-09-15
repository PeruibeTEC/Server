import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/user/services/User/SendForgotPasswordEmailService';
import logger from '@shared/utils/logger';

export default class SendForgotPasswordEmailController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmailService.execute({ email });

    logger.info(`Email address "${email}" requested a password change`);

    return response.status(200).json();
  }
}
