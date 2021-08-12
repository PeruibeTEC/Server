import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
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
    const checkExistenceEventTypeUser =
      await this.eventTypeUserRepository.findByName(name);

    if (checkExistenceEventTypeUser) {
      throw new AppError('An Event Type with this name already exists.');
    }

    const eventTypeUser = await this.eventTypeUserRepository.create({ name });

    return eventTypeUser;
  }
}
