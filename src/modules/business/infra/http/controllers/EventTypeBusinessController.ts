import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateEventTypeBusinessService from '@modules/business/services/eventTypeBusiness/CreateEventTypeBusinessService';
import DeleteEventTypeBusinessService from '@modules/business/services/eventTypeBusiness/DeleteEventTypeBusinessService';
import IndexEventTypeBusinessService from '@modules/business/services/eventTypeBusiness/IndexEventTypeBusinessService';
import ShowEventTypeBusinessService from '@modules/business/services/eventTypeBusiness/ShowEventTypeBusinessService';
import UpdateEventTypeBusinessService from '@modules/business/services/eventTypeBusiness/UpdateEventTypeBusinessService';
import logger from '@shared/utils/logger';

export default class EventTypeBusinessController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createEventTypeBusinessService = container.resolve(
      CreateEventTypeBusinessService,
    );

    const eventTypeBusiness = await createEventTypeBusinessService.execute(
      name,
    );

    return response.json(eventTypeBusiness);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { event_type_business_id } = request.body;

    const deleteEventTypeBusinessService = container.resolve(
      DeleteEventTypeBusinessService,
    );

    await deleteEventTypeBusinessService.execute({ event_type_business_id });

    logger.info(`EventType for id: ${event_type_business_id} deleted `);

    return response.status(200).json({
      message: `Event Type for id: ${event_type_business_id} deleted `,
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexEventTypeBusinessService = container.resolve(
      IndexEventTypeBusinessService,
    );

    const eventTypeBusiness = await indexEventTypeBusinessService.execute();

    return response.status(200).json(eventTypeBusiness);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { event_type_business_id, name } = request.body;

    const updateEventTypeBusinessService = container.resolve(
      UpdateEventTypeBusinessService,
    );

    const eventTypeBusiness = await updateEventTypeBusinessService.execute({
      event_type_business_id,
      name,
    });

    logger.info(`EventType for id: ${event_type_business_id} has updated `);

    return response.json(eventTypeBusiness);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { event_type_business_id } = request.params;

    const showEventTypeBusinessService = container.resolve(
      ShowEventTypeBusinessService,
    );

    const eventTypeBusiness = await showEventTypeBusinessService.execute({
      event_type_business_id,
    });

    return response.json(eventTypeBusiness);
  }
}
