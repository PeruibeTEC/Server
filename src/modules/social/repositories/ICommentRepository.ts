import Comment from '../infra/typeorm/entities/Comment';
import ICommentDTO from '../dtos/ICommentDTO';

export default interface ICommentRepository {
  findAllByPost(): Promise<Comment[]>;
  create(data: ICommentDTO): Promise<Comment>;
  delete(id: string): Promise<string>;
  save(interest_point: Comment): Promise<Comment>;
}
