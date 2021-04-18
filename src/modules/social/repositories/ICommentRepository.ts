import Comment from '../infra/typeorm/entities/Comment';
import ICommentDTO from '../dtos/ICommentDTO';

export default interface ICommentRepository {
  findAllByPost(post_id: string): Promise<Comment[]>;
  findById(id: string): Promise<Comment | undefined>;
  create(data: ICommentDTO): Promise<Comment>;
  delete(id: string): Promise<string>;
  save(interest_point: Comment): Promise<Comment>;
}
