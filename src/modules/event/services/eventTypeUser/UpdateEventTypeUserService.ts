import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import EventTypeUser from '@modules/event/infra/typeorm/entities/EventTypeUser';
import IEventTypeUserRepository from '../../repositories/IEventTypeUserRepository';

interface IRequest {
  eventTypeUser_id: string;
  name: string;
}

@injectable()
export default class UpdateEventTypeUserService {
  constructor(
    @inject('EventTypeUserRepository')
    private eventTypeUserRepository: IEventTypeUserRepository,
  ) {}

  public async execute({
    eventTypeUser_id,
    name,
  }: IRequest): Promise<EventTypeUser> {
    const eventTypeUser = await this.eventTypeUserRepository.findById(
      eventTypeUser_id,
    );

    const checkExistenceEventTypeUser =
      await this.eventTypeUserRepository.findByName(name);

    if (!eventTypeUser) {
      throw new AppError('Event Type does not exists.', 404);
    }

    if (checkExistenceEventTypeUser) {
      throw new AppError('An Event Type with this name already exists.', 409);
    }

    Object.assign(eventTypeUser, { name });

    return this.eventTypeUserRepository.save(eventTypeUser);
  }
}
