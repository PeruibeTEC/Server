import Post from '../infra/typeorm/entities/Post';
import IPostDTO from '../dtos/IPostDTO';

export default interface IPostRepository {
  findAllPost(): Promise<Post[]>;
  findById(id: string): Promise<Post | undefined>;
  create(data: IPostDTO): Promise<Post>;
  delete(id: string): Promise<string>;
  save(interest_point: Post): Promise<Post>;
}
