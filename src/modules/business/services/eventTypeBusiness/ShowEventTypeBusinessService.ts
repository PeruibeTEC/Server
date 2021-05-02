import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import EventTypeBusiness from '../../infra/typeorm/entities/EventTypeBusiness';
import IEventTypeBusinessRepository from '../../repositories/IEventTypeBusinessRepository';

interface IRequest {
  event_type_business_id: string;
}

@injectable()
export default class IndexEventTypeBusinessService {
  constructor(
    @inject('EventTypeBusinessRepository')
    private eventTypeBusinessRepository: IEventTypeBusinessRepository,
  ) {}

  public async execute({
    event_type_business_id,
  }: IRequest): Promise<EventTypeBusiness | undefined> {
    const eventTypeBusiness = await this.eventTypeBusinessRepository.findById(
      event_type_business_id,
    );

    if (!eventTypeBusiness) {
      throw new AppError('Event Type not found.', 404);
    }

    return eventTypeBusiness;
  }
}
