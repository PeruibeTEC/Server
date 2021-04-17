import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexEventTypeUserService from '@modules/event/services/eventTypeUser/IndexEventTypeUserService';
import CreateEventTypeUserService from '@modules/event/services/eventTypeUser/CreateEventTypeUserService';

export default class EventTypeUserController {
  public async index(_: Request, response: Response): Promise<Response> {
    const indexEventTypeUser = container.resolve(IndexEventTypeUserService);

    const eventTypeUser = await indexEventTypeUser.execute();

    return response.status(200).json(eventTypeUser);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createEventTypeUser = container.resolve(CreateEventTypeUserService);

    const eventTypeUser = await createEventTypeUser.execute({ name });

    return response.json(eventTypeUser);
  }
}
