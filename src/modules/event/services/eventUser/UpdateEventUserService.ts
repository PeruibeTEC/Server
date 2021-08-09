import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import EventUser from '@modules/event/infra/typeorm/entities/EventUser';
import EventTypeUser from '@modules/event/infra/typeorm/entities/EventTypeUser';
import IDatefnsProvider from '@shared/providers/DatefnsProvider/models/IDatefnsProvider';
import IEventUserRepository from '../../repositories/IEventUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
  event_id: string;
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

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    event_id,
    name,
    description,
    date,
    end_time,
    start_time,
    event_type_id,
  }: IRequest): Promise<EventUser> {
    const eventUser = await this.eventUserRepository.findById(event_id);

    if (!eventUser) {
      throw new AppError('Event Type does not exists.', 404);
    }

    if (user_id !== eventUser.user_id) {
      throw new AppError('This event does not belong to this user.', 409);
    }

    const thisDateisAfter = await this.dateFnsProvider.thisDateIsAfter(date);

    if (!thisDateisAfter) {
      throw new AppError('The date provided is not valid', 412);
    }

    Object.assign(eventUser, {
      name,
      description,
      date,
      end_time,
      start_time,
      event_type_id,
    });

    await this.cacheProvider.invalidate('events-user');

    return this.eventUserRepository.save(eventUser);
  }
}
