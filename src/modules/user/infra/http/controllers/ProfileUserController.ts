import ShowProfileUserService from '@modules/user/services/ShowProfileUserService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ProfileUserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id: string = (request.params as unknown) as string;

    const showUser = container.resolve(ShowProfileUserService);

    const user = await showUser.execute({
      user_id,
    });

    return response.status(200).json({ user });
  }
}
