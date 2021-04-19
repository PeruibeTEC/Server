import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ICommentProjectDTO from '@modules/project/dtos/ICommentProjectDTO';
import ProjectComment from '../../infra/typeorm/entities/ProjectComment';
import ICommentProjectRepository from '../../repositories/ICommentProjectRepository';

@injectable()
export default class CreateProjectCommentService {
  constructor(
    @inject('ProjectCommentRepository')
    private projectCommentRepository: ICommentProjectRepository,
  ) {}

  public async execute({
    content,
    user_id,
    public_project_id,
  }: ICommentProjectDTO): Promise<ProjectComment> {
    if (content.length > 255) {
      throw new AppError('Content has exceeded the characters limit.', 413);
    }

    const commentProject = this.projectCommentRepository.create({
      content,
      user_id,
      public_project_id,
    });

    return commentProject;
  }
}
