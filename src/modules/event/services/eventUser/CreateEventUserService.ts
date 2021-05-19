import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import EventUser from '@modules/event/infra/typeorm/entities/EventUser';
import IDatefnsProvider from '@shared/providers/DatefnsProvider/models/IDatefnsProvider';
import IEventUserRepository from '../../repositories/IEventUserRepository';

interface IRequest {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  description: string;
  event_type_id: string;
  user_id: string;
}

@injectable()
export default class CreateEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,

    @inject('DatefnsProvider')
    private dateFnsProvider: IDatefnsProvider,
  ) {}

  public async execute({
    name,
    date,
    start_time,
    end_time,
    description,
    event_type_id,
    user_id,
  }: IRequest): Promise<EventUser> {
    const thisDateisAfter = await this.dateFnsProvider.thisDateIsAfter(
      String(date),
    );

    if (!thisDateisAfter) {
      throw new AppError('The date provided is not valid', 412);
    }

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
