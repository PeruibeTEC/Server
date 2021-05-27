import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import EventBusiness from '../../infra/typeorm/entities/EventBusiness';
import IEventBusinessRepository from '../../repositories/IEventBusinessRepository';

interface IRequest {
  event_business_id: string;
}

@injectable()
export default class ShowEventBusinessService {
  constructor(
    @inject('EventBusinessRepository')
    private eventBusinessRepository: IEventBusinessRepository,
  ) {}

  public async execute({
    event_business_id,
  }: IRequest): Promise<EventBusiness | undefined> {
    const eventBusiness = await this.eventBusinessRepository.findById(
      event_business_id,
    );

    if (!eventBusiness) {
      throw new AppError('Event not found.', 404);
    }

    return eventBusiness;
  }
}
