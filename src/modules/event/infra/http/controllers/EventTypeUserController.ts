import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexEventTypeUserService from '@modules/event/services/eventTypeUser/IndexEventTypeUserService';
import CreateEventTypeUserService from '@modules/event/services/eventTypeUser/CreateEventTypeUserService';
import ShowEventTypeUserService from '@modules/event/services/eventTypeUser/ShowEventTypeUserService';

export default class EventTypeUserController {
  public async index(_: Request, response: Response): Promise<Response> {
    const indexEventTypeUser = container.resolve(IndexEventTypeUserService);

    const eventTypeUser = await indexEventTypeUser.execute();

    return response.status(200).json(eventTypeUser);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_type_id } = request.params;

    const showEventTypeUser = container.resolve(ShowEventTypeUserService);

    const eventTypeUser = await showEventTypeUser.execute({
      eventTypeUser_id: event_type_id,
    });

    return response.status(200).json(eventTypeUser);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createEventTypeUser = container.resolve(CreateEventTypeUserService);

    const eventTypeUser = await createEventTypeUser.execute({ name });

    return response.json(eventTypeUser);
  }
}
