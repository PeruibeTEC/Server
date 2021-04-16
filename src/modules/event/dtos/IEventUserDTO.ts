import User from '@modules/user/infra/typeorm/entities/User';
import EventTypeUser from '../infra/typeorm/entities/EventTypeUser';

export default interface IEventUserDTO {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  description: string;
  user_id: User;
  event_type_id: EventTypeUser;
}
