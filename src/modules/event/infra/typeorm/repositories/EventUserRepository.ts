import IEventUserDTO from '@modules/event/dtos/IEventUserDTO';
import IEventUserRepository from '@modules/event/repositories/IEventUserRepository';
import { getRepository, Repository } from 'typeorm';
import EventUser from '../entities/EventUser';

export default class EventUserRepository implements IEventUserRepository {
  private ormRepository: Repository<EventUser>;

  constructor() {
    this.ormRepository = getRepository(EventUser);
  }

  public async findAllEventUser(user_id?: string): Promise<EventUser[]> {
    let eventsUser: EventUser[];

    if (user_id) {
      eventsUser = await this.ormRepository.find({
        where: {
          user_id,
        },
      });
    } else {
      eventsUser = await this.ormRepository.find();
    }

    return eventsUser;
  }

  public async findById(id: string): Promise<EventUser | undefined> {
    const eventUser = await this.ormRepository.findOne(id);

    return eventUser;
  }

  public async create(eventUserData: IEventUserDTO): Promise<EventUser> {
    const eventUser = this.ormRepository.create(eventUserData);

    await this.ormRepository.save(eventUser);

    return eventUser;
  }

  public async save(eventUserData: IEventUserDTO): Promise<EventUser> {
    return this.ormRepository.save(eventUserData);
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Event-User-id: ${id} deleted`;
  }
}