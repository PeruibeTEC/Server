import EventTypeUser from '../infra/typeorm/entities/EventTypeUser';
import IEventTypeUserDTO from '../dtos/IEventTypeUserDTO';

export default interface IEventTypeUserRepository {
  findAllEventTypeUser(): Promise<EventTypeUser[]>;
  create(data: IEventTypeUserDTO): Promise<EventTypeUser>;
}
