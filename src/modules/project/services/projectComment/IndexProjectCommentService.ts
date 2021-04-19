import { injectable, inject } from 'tsyringe';
import CommentProject from '@modules/project/infra/typeorm/entities/ProjectComment';
import IProjectCommentRepository from '../../repositories/ICommentProjectRepository';

interface IRequest {
  public_project_id: string;
}

@injectable()
export default class IndexProjectService {
  constructor(
    @inject('ProjectCommentRepository')
    private projectCommentRepository: IProjectCommentRepository,
  ) {}

  public async execute({
    public_project_id,
  }: IRequest): Promise<CommentProject[] | undefined> {
    const commentsByProject = await this.projectCommentRepository.findAllByProject(
      public_project_id,
    );

    return commentsByProject;
  }
}
