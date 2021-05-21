import { Request, Response } from 'express';
import { container } from 'tsyringe';

import TouristAuthenticationService from '@modules/user/services/Tourist/TouristAuthenticationService';

export default class TouristSessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const touristAuthentication = container.resolve(
      TouristAuthenticationService,
    );

    const { tourist, token } = await touristAuthentication.execute({
      email,
      password,
    });

    // @ts-expect-error ⠀⠀⠀
    delete tourist.password;

    return response.json({
      tourist,
      token,
    });
  }
}
