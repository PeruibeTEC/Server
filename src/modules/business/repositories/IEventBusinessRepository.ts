import EventBusiness from '../infra/typeorm/entities/EventBusiness';
import IEventBusinessDTO from '../dtos/IEventBusinessDTO';

export default interface IEventBusinessRepository {
  findAllEventBusiness(): Promise<EventBusiness[]>;
  findEventByBusiness(
    business_id: string,
  ): Promise<EventBusiness[] | undefined>;
  findById(id: string): Promise<EventBusiness | undefined>;
  findByName(name: string): Promise<EventBusiness | undefined>;
  create(data: IEventBusinessDTO): Promise<EventBusiness>;
  delete(id: string): Promise<string>;
  save(event_business: EventBusiness): Promise<EventBusiness>;
}
