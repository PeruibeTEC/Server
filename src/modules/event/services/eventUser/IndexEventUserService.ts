import { inject, injectable } from 'tsyringe';
import EventUser from '../../infra/typeorm/entities/EventTypeUser';
import IEventUserRepository from '../../repositories/IEventUserRepository';

@injectable()
export default class IndexEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,
  ) {}

  public async execute(user_id: string): Promise<EventUser[]> {
    const eventsUser = await this.eventUserRepository.findAllEventUser(user_id);

    return eventsUser;
  }
}
