import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateBusinessService from '@modules/business/services/business/BusinessAuthenticationService';
import logger from '@shared/utils/logger';

export default class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email_login, password } = request.body;

    const authenticateBusiness = container.resolve(AuthenticateBusinessService);

    const { business, token } = await authenticateBusiness.execute({
      email_login,
      password,
    });

    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    logger.info(`The business of id: ${business.id} started a session`);

    return response.json({
      business,
      token,
    });
  }
}
