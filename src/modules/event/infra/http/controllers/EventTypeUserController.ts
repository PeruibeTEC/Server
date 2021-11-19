import { Request, Response } from 'express';
import { container } from 'tsyringe';

import IndexEventTypeUserService from '@modules/event/services/eventTypeUser/IndexEventTypeUserService';
import CreateEventTypeUserService from '@modules/event/services/eventTypeUser/CreateEventTypeUserService';
import ShowEventTypeUserService from '@modules/event/services/eventTypeUser/ShowEventTypeUserService';
import DeleteEventTypeUserService from '@modules/event/services/eventTypeUser/DeleteEventTypeUserService';
import UpdateEventTypeUserService from '@modules/event/services/eventTypeUser/UpdateEventTypeUserService';

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

    return response.status(201).json(eventTypeUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { event_type_id, name } = request.body;

    const updateEventTypeUser = container.resolve(UpdateEventTypeUserService);

    const eventTypeUser = await updateEventTypeUser.execute({
      eventTypeUser_id: event_type_id,
      name,
    });

    return response.status(200).json(eventTypeUser);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { event_type_id } = request.body;

    const deleteEventTypeUser = container.resolve(DeleteEventTypeUserService);

    await deleteEventTypeUser.execute({
      eventTypeUser_id: event_type_id,
    });

    return response
      .status(200)
      .json({ message: `Event Type User ${event_type_id} deleted ` });
  }
}
