import { inject, injectable } from 'tsyringe';
import EventTypeUser from '../../infra/typeorm/entities/EventTypeUser';
import IEventTypeUserRepository from '../../repositories/IEventTypeUserRepository';

@injectable()
export default class IndexEventTypeUserService {
  constructor(
    @inject('EventTypeUserRepository')
    private eventTypeUserRepository: IEventTypeUserRepository,
  ) {}

  public async execute(): Promise<EventTypeUser[]> {
    const eventTypeUser = await this.eventTypeUserRepository.findAllEventTypeUser();

    return eventTypeUser;
  }
}
