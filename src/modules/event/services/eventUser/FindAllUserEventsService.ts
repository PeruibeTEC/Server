import { inject, injectable } from 'tsyringe';
import EventUser from '../../infra/typeorm/entities/EventTypeUser';
import IEventUserRepository from '../../repositories/IEventUserRepository';

@injectable()
export default class FindAllUserEventsService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,
  ) {}

  public async execute(user_id: string): Promise<EventUser[]> {
    const userEvents = await this.eventUserRepository.findAllUserEvents(
      user_id,
    );

    return userEvents;
  }
}
