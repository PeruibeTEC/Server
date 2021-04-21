import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import EventUser from '@modules/event/infra/typeorm/entities/EventUser';
import IEventUserDTO from '@modules/event/dtos/IEventUserDTO';
import IDatefnsProvider from '@shared/providers/DatefnsProvider/models/IDatefnsProvider';
import IEventUserRepository from '../../repositories/IEventUserRepository';

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
  }: IEventUserDTO): Promise<EventUser> {
    const stringDate = String(date);
    const thisDateisAfter = await this.dateFnsProvider.thisDateIsAfter(
      stringDate,
    );

    if (!thisDateisAfter) {
      throw new AppError('The date provided is not valid', 400);
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
