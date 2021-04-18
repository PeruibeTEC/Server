import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import EventUser from '../../infra/typeorm/entities/EventUser';
import IEventUserRepository from '../../repositories/IEventUserRepository';

interface IRequest {
  eventUser_id: string;
}

@injectable()
export default class ShowEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,
  ) {}

  public async execute({ eventUser_id }: IRequest): Promise<EventUser> {
    const eventUser = await this.eventUserRepository.findById(eventUser_id);

    if (!eventUser) {
      throw new AppError('Event User does not exists.', 404);
    }

    return eventUser;
  }
}
