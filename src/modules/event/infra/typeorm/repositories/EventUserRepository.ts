import IEventUserRepository from '@modules/event/repositories/IEventUserRepository';
import { getRepository, Repository } from 'typeorm';
import EventUser from '../entities/EventUser';

export default class EventUserRepository implements IEventUserRepository {
  private ormRepository: Repository<EventUser>;

  constructor() {
    this.ormRepository = getRepository(EventUser);
  }

  public async findAllEventUser(): Promise<EventUser[]> {
    const eventUser = await this.ormRepository.find();

    return eventUser;
  }
}
