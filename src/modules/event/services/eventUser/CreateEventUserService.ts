import { inject, injectable } from 'tsyringe';
import EventUser from '@modules/event/infra/typeorm/entities/EventUser';
import IEventUserDTO from '@modules/event/dtos/IEventUserDTO';
import IEventUserRepository from '../../repositories/IEventUserRepository';

@injectable()
export default class CreateEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,
  ) {}

  public async execute({
    name,
    date,
    start_time,
    end_time,
    description,
    event_type_id,
    user_id,
  }: IEventUserDTO): Promise<EventUser> {
    const eventUser = await this.eventUserRepository.create({
      name,
      date,
      start_time,
      end_time,
      description,
      event_type_id,
      user_id,
    });

    return eventUser;
  }
}
