import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEventBusinessService from '@modules/business/services/eventBusiness/CreateEventBusinessService';
import DeleteEventBusinessService from '@modules/business/services/eventBusiness/DeleteEventBusinessService';
import IndexEventBusinessService from '@modules/business/services/eventBusiness/IndexEventBusinessService';
import ShowEventBusinessService from '@modules/business/services/eventBusiness/ShowEventBusinessService';
import UpdateEventBusinessService from '@modules/business/services/eventBusiness/UpdateEventBusinessService';

export default class EventBusinessController {
  public async create(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;
    const {
      name,
      date,
      start_time,
      end_time,
      background_photo,
      description,
      event_type_business_id,
    } = request.body;

    const createEventBusinessService = container.resolve(
      CreateEventBusinessService,
    );

    const eventTypeBusiness = await createEventBusinessService.execute(
      name,
      date,
      start_time,
      end_time,
      background_photo,
      description,
      event_type_business_id,
      business_id,
    );

    return response.json(eventTypeBusiness);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;
    const { event_business_id } = request.body;

    const deleteEventBusinessService = container.resolve(
      DeleteEventBusinessService,
    );

    await deleteEventBusinessService.execute({
      business_id,
      event_business_id,
    });

    return response
      .status(200)
      .json({ message: `Event ${event_business_id} deleted ` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexEventBusinessService = container.resolve(
      IndexEventBusinessService,
    );

    const eventTypeBusiness = await indexEventBusinessService.execute();

    return response.status(200).json(eventTypeBusiness);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;
    const {
      name,
      date,
      start_time,
      end_time,
      background_photo,
      description,
      event_type_business_id,
      event_business_id,
    } = request.body;

    const updateEventBusinessService = container.resolve(
      UpdateEventBusinessService,
    );

    const eventTypeBusiness = await updateEventBusinessService.execute({
      name,
      date,
      start_time,
      end_time,
      background_photo,
      description,
      event_type_business_id,
      business_id,
      event_business_id,
    });

    return response.json(eventTypeBusiness);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_business_id } = request.params;

    const showEventBusinessService = container.resolve(
      ShowEventBusinessService,
    );

    const eventBusiness = await showEventBusinessService.execute({
      event_business_id,
    });

    return response.json(eventBusiness);
  }
}
