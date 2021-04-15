import User from '@modules/user/infra/typeorm/entities/User';

export default interface IPostDTO {
  content: string;
  has_photo: boolean;
  user_id: User;
}
