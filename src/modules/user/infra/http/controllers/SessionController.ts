import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/user/services/User/UserAuthenticationService';
import logger from '@shared/utils/logger';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    // @ts-expect-error ⠀⠀⠀
    delete user.password;

    logger.info(`The user of id: ${user.id} started a session`);

    return response.json({
      user,
      token,
    });
  }
}
