import Business from '../infra/typeorm/entities/Business';
import EventTypeBusiness from '../infra/typeorm/entities/EventTypeBusiness';

export default interface IEventBusinessDTO {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  background_photo: string;
  description: string;
  business_id: Business;
  event_type_id: EventTypeBusiness;
}
