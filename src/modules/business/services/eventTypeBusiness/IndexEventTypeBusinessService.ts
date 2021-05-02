import { injectable, inject } from 'tsyringe';

import EventTypeBusiness from '../../infra/typeorm/entities/EventTypeBusiness';
import IEventTypeBusinessRepository from '../../repositories/IEventTypeBusinessRepository';

@injectable()
export default class IndexEventTypeBusinessService {
  constructor(
    @inject('EventTypeBusinessRepository')
    private eventTypeBusinessRepository: IEventTypeBusinessRepository,
  ) {}

  public async execute(): Promise<EventTypeBusiness[]> {
    const eventTypeBusiness = await this.eventTypeBusinessRepository.findAllEventTypeBusiness();

    return eventTypeBusiness;
  }
}
