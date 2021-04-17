import EventTypeUser from '../infra/typeorm/entities/EventTypeUser';

export default interface IEventTypeUserRepository {
  findAllEventTypeUser(): Promise<EventTypeUser[]>;
}
