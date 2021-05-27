import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IEventTypeBusinessRepository from '../../repositories/IEventTypeBusinessRepository';

interface IRequest {
  event_type_business_id: string;
}

@injectable()
export default class DeleteEventTypeBusinessService {
  constructor(
    @inject('EventTypeBusinessRepository')
    private eventTypeBusinessRepository: IEventTypeBusinessRepository,
  ) {}

  public async execute({ event_type_business_id }: IRequest): Promise<void> {
    const eventTypeBusiness = await this.eventTypeBusinessRepository.findById(
      event_type_business_id,
    );

    if (!eventTypeBusiness) {
      throw new AppError('Event Type Business not found.', 404);
    }

    await this.eventTypeBusinessRepository.delete(event_type_business_id);
  }
}
