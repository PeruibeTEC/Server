import TheftLocation from '../infra/typeorm/entities/TheftLocation';
import User from '@modules/user/infra/typeorm/entities/User';

export default interface ITheftDTO {
  date: Date;
  time?: Date;
  description?: string;
  theft_location_id: TheftLocation;
  user_id: User;
}
