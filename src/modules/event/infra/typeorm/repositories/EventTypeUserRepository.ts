import { getRepository, Repository } from 'typeorm';

import IEventTypeUserRepository from '@modules/event/repositories/IEventTypeUserRepository';

import IEventTypeUserDTO from '@modules/event/dtos/IEventTypeUserDTO';
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

  public async findById(id: string): Promise<EventTypeUser | undefined> {
    const eventTypeUser = this.ormRepository.findOne(id);

    return eventTypeUser;
  }

  public async create(
    eventTypeUserData: IEventTypeUserDTO,
  ): Promise<EventTypeUser> {
    const eventTypeUser = this.ormRepository.create(eventTypeUserData);

    await this.ormRepository.save(eventTypeUser);

    return eventTypeUser;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Event-Type-User-id: ${id} deleted`;
  }
}
