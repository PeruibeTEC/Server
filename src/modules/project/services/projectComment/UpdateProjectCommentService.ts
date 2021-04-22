import { injectable, inject } from 'tsyringe';
import CommentProject from '@modules/project/infra/typeorm/entities/ProjectComment';
import AppError from '@shared/infra/http/errors/AppError';
import IProjectCommentRepository from '../../repositories/ICommentProjectRepository';
import IProjectRepository from '../../repositories/IProjectRepository';

interface IRequest {
  content: string;
  comment_id: string;
  user_id: string;
  public_project_id: string;
}

@injectable()
export default class UpdateProjectCommentService {
  constructor(
    @inject('ProjectCommentRepository')
    private projectCommentRepository: IProjectCommentRepository,

    @inject('ProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  public async execute({
    content,
    comment_id,
    public_project_id,
    user_id,
  }: IRequest): Promise<CommentProject> {
    const checkComment = await this.projectCommentRepository.findById(
      comment_id,
    );
    const checkProjectExists = await this.projectRepository.findById(
      public_project_id,
    );

    if (!checkProjectExists || !checkComment) {
      throw new AppError('Project or Comment not found.', 404);
    }

    if (checkComment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to delete this comment',
        401,
      );
    }

    Object.assign(checkComment, { content });

    return this.projectCommentRepository.save(checkComment);
  }
}
