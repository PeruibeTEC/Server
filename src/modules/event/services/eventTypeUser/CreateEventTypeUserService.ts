import { inject, injectable } from 'tsyringe';
import EventTypeUser from '@modules/event/infra/typeorm/entities/EventTypeUser';
import IEventTypeUserRepository from '../../repositories/IEventTypeUserRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class CreateEventTypeUserService {
  constructor(
    @inject('EventTypeUserRepository')
    private eventTypeUserRepository: IEventTypeUserRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<EventTypeUser> {
    const eventTypeUser = await this.eventTypeUserRepository.create({ name });

    return eventTypeUser;
  }
}
