import { getRepository, Repository } from 'typeorm';

import IEventTypeUserRepository from '@modules/event/repositories/IEventTypeUserRepository';

import EventTypeUser from '../entities/EventTypeUser';

export default class EventTypeUserRepository
  implements IEventTypeUserRepository {
  private ormRepository: Repository<EventTypeUser>;

  constructor() {
    this.ormRepository = getRepository(EventTypeUser);
  }

  public async findAllEventTypeUser(): Promise<EventTypeUser[]> {
    const eventTypeUser = await this.ormRepository.find();

    return eventTypeUser;
  }
}
