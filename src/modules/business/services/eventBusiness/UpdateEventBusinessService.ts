import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import EventBusiness from '../../infra/typeorm/entities/EventBusiness';
import IEventBusinessRepository from '../../repositories/IEventBusinessRepository';

interface IRequest {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  background_photo: string;
  description: string;
  event_type_business_id: string;
  business_id: string;
  event_business_id: string;
}

@injectable()
export default class UpdateEventBusinessService {
  constructor(
    @inject('EventBusinessRepository')
    private eventBusinessRepository: IEventBusinessRepository,
  ) {}

  public async execute({
    name,
    date,
    start_time,
    end_time,
    background_photo,
    description,
    event_type_business_id,
    event_business_id,
    business_id,
  }: IRequest): Promise<EventBusiness> {
    const eventBusiness = await this.eventBusinessRepository.findById(
      event_business_id,
    );

    if (!eventBusiness) {
      throw new AppError('Business Event not found.', 404);
    }

    if (eventBusiness.business_id !== business_id) {
      throw new AppError(
        'Business does not have permission to update this event.',
        403,
      );
    }

    const verifyEventBusinessName =
      await this.eventBusinessRepository.findByName(name);

    if (verifyEventBusinessName) {
      throw new AppError(`Event name already exists.`, 409);
    }

    Object.assign(eventBusiness, {
      name,
      date,
      start_time,
      end_time,
      background_photo,
      description,
      event_type_business_id,
      business_id,
    });

    return this.eventBusinessRepository.save(eventBusiness);
  }
}
