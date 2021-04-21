import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import EventUser from '@modules/event/infra/typeorm/entities/EventUser';
import EventTypeUser from '@modules/event/infra/typeorm/entities/EventTypeUser';
import IDatefnsProvider from '@shared/providers/DatefnsProvider/models/IDatefnsProvider';
import IEventUserRepository from '../../repositories/IEventUserRepository';

interface IRequest {
  eventUser_id: string;
  name: string;
  date: string;
  start_time: Date;
  end_time: Date;
  description: string;
  event_type_id: EventTypeUser;
}

@injectable()
export default class UpdateEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,

    @inject('DatefnsProvider')
    private dateFnsProvider: IDatefnsProvider,
  ) {}

  public async execute({
    eventUser_id,
    name,
    description,
    date,
    end_time,
    start_time,
    event_type_id,
  }: IRequest): Promise<EventUser> {
    const eventUser = await this.eventUserRepository.findById(eventUser_id);

    if (!eventUser) {
      throw new AppError('Event Type does not exists.', 404);
    }

    const thisDateisAfter = await this.dateFnsProvider.thisDateIsAfter(date);

    if (!thisDateisAfter) {
      throw new AppError('The date provided is not valid', 400);
    }

    Object.assign(eventUser, {
      name,
      description,
      date,
      end_time,
      start_time,
      event_type_id,
    });

    return this.eventUserRepository.save(eventUser);
  }
}
