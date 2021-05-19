import AuthenticateUserService from '@modules/user/services/User/UserAuthenticationService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

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

    return response.json({
      user,
      token,
    });
  }
}
