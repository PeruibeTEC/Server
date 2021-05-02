import { injectable, inject } from 'tsyringe';

import EventBusiness from '../../infra/typeorm/entities/EventBusiness';
import IEventBusinessRepository from '../../repositories/IEventBusinessRepository';

export interface IRequest {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  background_photo: string;
  description: string;
  event_type_business_id: string;
  business_id: string;
}

@injectable()
export default class CreateEventBusinessService {
  constructor(
    @inject('EventBusinessRepository')
    private eventBusinessRepository: IEventBusinessRepository,
  ) {}

  public async execute(
    name: string,
    date: Date,
    start_time: Date,
    end_time: Date,
    background_photo: string,
    description: string,
    event_type_business_id: string,
    business_id: string,
  ): Promise<EventBusiness> {
    const eventBusiness = this.eventBusinessRepository.create({
      name,
      date,
      start_time,
      end_time,
      background_photo,
      description,
      event_type_business_id,
      business_id,
    });

    return eventBusiness;
  }
}
