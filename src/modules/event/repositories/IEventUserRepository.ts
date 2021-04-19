import EventUser from '../infra/typeorm/entities/EventUser';
import IEventUserDTO from '../dtos/IEventUserDTO';

export default interface IEventUserRepository {
  findAllEventUser(): Promise<EventUser[]>;
  findById(id: string): Promise<EventUser | undefined>;
  create(data: IEventUserDTO): Promise<EventUser>;
  delete(id: string): Promise<string>;
}
