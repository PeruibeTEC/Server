import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';
import IEventUserRepository from '../../repositories/IEventUserRepository';

interface IRequest {
  eventUser_id: string;
}

@injectable()
export default class DeleteEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,
  ) {}

  public async execute({ eventUser_id }: IRequest): Promise<void> {
    const eventUser = await this.eventUserRepository.findById(eventUser_id);

    if (!eventUser) {
      throw new AppError('Event does not exists.', 404);
    }

    await this.eventUserRepository.delete(eventUser.id);
  }
}
