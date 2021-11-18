import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import EventTypeBusiness from '../../infra/typeorm/entities/EventTypeBusiness';
import IEventTypeBusinessRepository from '../../repositories/IEventTypeBusinessRepository';

interface IRequest {
  event_type_business_id: string;
  name: string;
}

@injectable()
export default class UpdateEventTypeBusinessService {
  constructor(
    @inject('EventTypeBusinessRepository')
    private eventTypeBusinessRepository: IEventTypeBusinessRepository,
  ) {}

  public async execute({
    event_type_business_id,
    name,
  }: IRequest): Promise<EventTypeBusiness> {
    const eventTypeBusiness = await this.eventTypeBusinessRepository.findById(
      event_type_business_id,
    );

    if (!eventTypeBusiness) {
      throw new AppError('Business Type not found.', 404);
    }

    if (name.length > 150) {
      throw new AppError('Content has exceeded the character limit.', 413);
    }

    const eventTypeBusinessName =
      await this.eventTypeBusinessRepository.findByName(name);

    if (eventTypeBusinessName) {
      throw new AppError('Event type name already used.');
    }

    Object.assign(eventTypeBusiness, { name });

    return this.eventTypeBusinessRepository.save(eventTypeBusiness);
  }
}
