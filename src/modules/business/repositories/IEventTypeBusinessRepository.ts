import EventTypeBusiness from '../infra/typeorm/entities/EventTypeBusiness';
import IEventTypeBusinessDTO from '../dtos/IEventTypeBusinessDTO';

export default interface IEventTypeBusinessRepository {
  findAllEventTypeBusiness(): Promise<EventTypeBusiness[]>;
  findById(id: string): Promise<EventTypeBusiness | undefined>;
  findByName(name: string): Promise<EventTypeBusiness | undefined>;
  create(data: IEventTypeBusinessDTO): Promise<EventTypeBusiness>;
  delete(id: string): Promise<string>;
  save(event_type_business: EventTypeBusiness): Promise<EventTypeBusiness>;
}
