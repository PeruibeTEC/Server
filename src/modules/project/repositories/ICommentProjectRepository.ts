import CommentProject from '../infra/typeorm/entities/ProjectComment';
import ICommentProjectDTO from '../dtos/ICommentProjectDTO';

export default interface ICommentProjectRepository {
  findAllByProject(): Promise<CommentProject[]>;
  findById(id: string): Promise<CommentProject | undefined>;
  findByName(name: string): Promise<CommentProject | undefined>;
  create(data: ICommentProjectDTO): Promise<CommentProject>;
  delete(id: string): Promise<string>;
  save(photo_project: ICommentProjectDTO): Promise<CommentProject>;
}
