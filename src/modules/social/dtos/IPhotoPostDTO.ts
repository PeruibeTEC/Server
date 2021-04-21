import Post from '../infra/typeorm/entities/Post';

export default interface IPhotoPostDTO {
  url: string;
  post_id: Post;
}
