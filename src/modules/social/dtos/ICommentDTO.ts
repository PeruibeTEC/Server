import User from '@modules/user/infra/typeorm/entities/User';
import Post from '../infra/typeorm/entities/Post';

export default interface ICommentDTO {
  content: string;
  post_id: Post;
  user_id: User;
}
