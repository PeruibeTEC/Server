import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import IEventUserRepository from '../../repositories/IEventUserRepository';

interface IRequest {
  user_id: string;
  eventUser_id: string;
}

@injectable()
export default class DeleteEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,
  ) {}

  public async execute({ user_id, eventUser_id }: IRequest): Promise<void> {
    const eventUser = await this.eventUserRepository.findById(eventUser_id);

    if (!eventUser) {
      throw new AppError('Event does not exists.', 404);
    }

    if (user_id !== eventUser.user_id) {
      throw new AppError('This event does not belong to this user.', 404);
    }

    await this.eventUserRepository.delete(eventUser.id);
  }
}
