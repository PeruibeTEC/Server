import CommentProject from '../infra/typeorm/entities/ProjectComment';
import ICommentProjectDTO from '../dtos/ICommentProjectDTO';

export default interface ICommentProjectRepository {
  findAllByProject(
    public_project_id: string,
  ): Promise<CommentProject[] | undefined>;
  findById(id: string): Promise<CommentProject | undefined>;
  create(data: ICommentProjectDTO): Promise<CommentProject>;
  delete(id: string): Promise<string>;
  save(comment_project: ICommentProjectDTO): Promise<CommentProject>;
}
