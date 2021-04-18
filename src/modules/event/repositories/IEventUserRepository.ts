import EventUser from '../infra/typeorm/entities/EventUser';

export default interface IEventUserRepository {
  findAllEventUser(): Promise<EventUser[]>;
  findById(id: string): Promise<EventUser | undefined>;
}
