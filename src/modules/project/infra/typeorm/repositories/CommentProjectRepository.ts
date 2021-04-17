import { getRepository, Repository } from 'typeorm';

import ICommentProjectRepository from '@modules/project/repositories/ICommentProjectRepository';
import ICommentProjectDTO from '@modules/project/dtos/ICommentProjectDTO';
import CommentProject from '../entities/ProjectComment';

export default class CommentProjectRepository
  implements ICommentProjectRepository {
  private ormRepository: Repository<CommentProject>;

  constructor() {
    this.ormRepository = getRepository(CommentProject);
  }

  public async findAllByProject(): Promise<CommentProject[]> {
    const commentsProject = await this.ormRepository.find();

    return commentsProject;
  }

  public async findById(id: string): Promise<CommentProject | undefined> {
    const comments = await this.ormRepository.findOne(id);

    return comments;
  }

  public async create(
    commentProjectData: ICommentProjectDTO,
  ): Promise<CommentProject> {
    const comments = this.ormRepository.create(commentProjectData);

    await this.ormRepository.save(comments);

    return comments;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `CommentProject_id: ${id} deleted`;
  }

  public async save(commentProject: CommentProject): Promise<CommentProject> {
    return this.ormRepository.save(commentProject);
  }
}
