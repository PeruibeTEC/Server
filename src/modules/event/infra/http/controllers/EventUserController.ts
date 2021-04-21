import { Request, Response } from 'express';
import IndexEventUserService from '@modules/event/services/eventUser/IndexEventUserService';
import ShowEventUserService from '@modules/event/services/eventUser/ShowEventUserService';
import CreateEventUserService from '@modules/event/services/eventUser/CreateEventUserService';
import DeleteEventUserService from '@modules/event/services/eventUser/DeleteEventUserService';
import UpdateEventUserService from '@modules/event/services/eventUser/UpdateEventUserService';

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

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      name,
      date,
      start_time,
      end_time,
      description,
      event_type_id,
    } = request.body;

    const createEventUser = container.resolve(CreateEventUserService);

    const eventUser = await createEventUser.execute({
      name,
      date,
      start_time,
      end_time,
      description,
      event_type_id,
      user_id,
    });

    return response.json(eventUser);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { event_id } = request.params;
    const {
      name,
      description,
      date,
      end_time,
      start_time,
      event_type_id,
    } = request.body;

    const updateEventUser = container.resolve(UpdateEventUserService);

    const eventUser = await updateEventUser.execute({
      user_id,
      event_id,
      name,
      description,
      date,
      end_time,
      start_time,
      event_type_id,
    });

    return response.status(200).json(eventUser);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { event_id } = request.params;

    const deleteEventUser = container.resolve(DeleteEventUserService);

    const eventUser = await deleteEventUser.execute({
      user_id,
      eventUser_id: event_id,
    });

    return response.status(200).json(eventUser);
  }
}
