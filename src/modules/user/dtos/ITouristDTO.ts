import User from '../infra/typeorm/entities/User';

export default interface ITouristDTO {
  state?: string;
  city?: string;
  is_foreigner: boolean;
  country_foreigner?: string;
  user_id: User;
}
