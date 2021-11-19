import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import EventTypeBusiness from '../../infra/typeorm/entities/EventTypeBusiness';
import IEventTypeBusinessRepository from '../../repositories/IEventTypeBusinessRepository';

@injectable()
export default class CreateEventTypeBusinessService {
  constructor(
    @inject('EventTypeBusinessRepository')
    private eventTypeBusinessRepository: IEventTypeBusinessRepository,
  ) {}

  public async execute(name: string): Promise<EventTypeBusiness> {
    if (name.length > 150) {
      throw new AppError('Content has exceeded the character limit', 413);
    }

    const checkBusinessTypeExists =
      await this.eventTypeBusinessRepository.findByName(name);
    if (checkBusinessTypeExists) {
      throw new AppError('Type already exists', 409);
    }

    const eventTypeBusiness = this.eventTypeBusinessRepository.create({
      name,
    });

    return eventTypeBusiness;
  }
}
