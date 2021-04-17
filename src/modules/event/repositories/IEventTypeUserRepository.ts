import EventTypeUser from '../infra/typeorm/entities/EventTypeUser';
import IEventTypeUserDTO from '../dtos/IEventTypeUserDTO';

export default interface IEventTypeUserRepository {
  findAllEventTypeUser(): Promise<EventTypeUser[]>;
  findById(id: string): Promise<EventTypeUser | undefined>;
  create(data: IEventTypeUserDTO): Promise<EventTypeUser>;
  save(event_type_user: EventTypeUser): Promise<EventTypeUser>;
  delete(id: string): Promise<string>;
}
