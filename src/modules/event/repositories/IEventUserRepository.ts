import EventUser from '../infra/typeorm/entities/EventUser';
import IEventUserDTO from '../dtos/IEventUserDTO';

export default interface IEventUserRepository {
  findAllEventUser(user_id?: string): Promise<EventUser[]>;
  findById(id: string): Promise<EventUser | undefined>;
  create(data: IEventUserDTO): Promise<EventUser>;
  save(event_user: EventUser): Promise<EventUser>;
  delete(id: string): Promise<string>;
}
