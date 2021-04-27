import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import IEventTypeUserRepository from '../../repositories/IEventTypeUserRepository';

interface IRequest {
  eventTypeUser_id: string;
}

@injectable()
export default class DeleteEventTypeUserService {
  constructor(
    @inject('EventTypeUserRepository')
    private eventTypeUserRepository: IEventTypeUserRepository,
  ) {}

  public async execute({ eventTypeUser_id }: IRequest): Promise<void> {
    const eventTypeUser = await this.eventTypeUserRepository.findById(
      eventTypeUser_id,
    );

    if (!eventTypeUser) {
      throw new AppError('Event Type does not exists.', 404);
    }

    await this.eventTypeUserRepository.delete(eventTypeUser.id);
  }
}
