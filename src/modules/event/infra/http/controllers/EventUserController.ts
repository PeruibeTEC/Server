import { Request, Response } from 'express';
import IndexEventUserService from '@modules/event/services/eventUser/IndexEventUserService';
import { container } from 'tsyringe';

export default class EventUserController {
  public async index(_: Request, response: Response): Promise<Response> {
    const indexEventUser = container.resolve(IndexEventUserService);

    const eventUser = await indexEventUser.execute();

    return response.status(200).json(eventUser);
  }
}
