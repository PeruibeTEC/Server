import { Request, Response } from 'express';
import IndexEventUserService from '@modules/event/services/eventUser/IndexEventUserService';
import ShowEventUserService from '@modules/event/services/eventUser/ShowEventUserService';
import { container } from 'tsyringe';

export default class EventUserController {
  public async index(_: Request, response: Response): Promise<Response> {
    const indexEventUser = container.resolve(IndexEventUserService);

    const eventUser = await indexEventUser.execute();

    return response.status(200).json(eventUser);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_id } = request.params;

    const showEventUser = container.resolve(ShowEventUserService);

    const eventUser = await showEventUser.execute({
      eventUser_id: event_id,
    });

    return response.status(200).json(eventUser);
  }
}
