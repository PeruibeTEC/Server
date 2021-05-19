import { Request, Response } from 'express';

import { container } from 'tsyringe';

import AuthenticateBusinessService from '@modules/business/services/business/BusinessAuthenticationService';

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

    return response.json({
      business,
      token,
    });
  }
}
