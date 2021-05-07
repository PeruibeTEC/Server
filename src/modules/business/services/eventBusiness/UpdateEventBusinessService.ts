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
      throw new AppError('Business Type not found.', 404);
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