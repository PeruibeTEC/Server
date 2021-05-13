import { getRepository, Repository } from 'typeorm';

import IEventBusinessRepository from '@modules/business/repositories/IEventBusinessRepository';
import IEventBusinessDTO from '@modules/business/dtos/IEventBusinessDTO';

import EventBusiness from '../entities/EventBusiness';

export default class EventBusinessRepository
  implements IEventBusinessRepository {
  private ormRepository: Repository<EventBusiness>;

  constructor() {
    this.ormRepository = getRepository(EventBusiness);
  }

  public async findById(id: string): Promise<EventBusiness | undefined> {
    const event_business = await this.ormRepository.findOne(id);

    return event_business;
  }

  public async findByName(name: string): Promise<EventBusiness | undefined> {
    const event_business = await this.ormRepository.findOne({
      where: { name },
    });

    return event_business;
  }

  public async findEventByBusiness(
    business_id: string,
  ): Promise<EventBusiness[] | undefined> {
    const event_business = await this.ormRepository.find({
      where: { business_id },
    });

    return event_business;
  }

  public async findAllEventBusiness(): Promise<EventBusiness[]> {
    const event_business = await this.ormRepository.find();

    return event_business;
  }

  public async create(
    eventBusinessData: IEventBusinessDTO,
  ): Promise<EventBusiness> {
    const event_business = this.ormRepository.create(eventBusinessData);

    await this.ormRepository.save(event_business);

    return event_business;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `EventBusiness_id: ${id} deleted`;
  }

  public async save(event_business: EventBusiness): Promise<EventBusiness> {
    return this.ormRepository.save(event_business);
  }
}
