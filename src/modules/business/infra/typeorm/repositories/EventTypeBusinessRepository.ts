import { getRepository, Repository } from 'typeorm';

import IEventTypeBusinessRepository from '@modules/business/repositories/IEventTypeBusinessRepository';
import IEventTypeBusinessDTO from '@modules/business/dtos/IEventTypeBusinessDTO';

import EventTypeBusiness from '../entities/EventTypeBusiness';

export default class EventTypeBusinessRepository
  implements IEventTypeBusinessRepository {
  private ormRepository: Repository<EventTypeBusiness>;

  constructor() {
    this.ormRepository = getRepository(EventTypeBusiness);
  }

  public async findById(id: string): Promise<EventTypeBusiness | undefined> {
    const event_type_business = await this.ormRepository.findOne(id);

    return event_type_business;
  }

  public async findByName(
    name: string,
  ): Promise<EventTypeBusiness | undefined> {
    const event_type_business = await this.ormRepository.findOne({
      where: { name },
    });

    return event_type_business;
  }

  public async findAllEventTypeBusiness(): Promise<EventTypeBusiness[]> {
    let event_type_business: EventTypeBusiness[];

    // eslint-disable-next-line prefer-const
    event_type_business = await this.ormRepository.find();

    return event_type_business;
  }

  public async create(
    eventTypeBusinessData: IEventTypeBusinessDTO,
  ): Promise<EventTypeBusiness> {
    const event_type_business = this.ormRepository.create(
      eventTypeBusinessData,
    );

    await this.ormRepository.save(event_type_business);

    return event_type_business;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `EventTypeBusiness_id: ${id} deleted`;
  }

  public async save(
    event_type_business: EventTypeBusiness,
  ): Promise<EventTypeBusiness> {
    return this.ormRepository.save(event_type_business);
  }
}
