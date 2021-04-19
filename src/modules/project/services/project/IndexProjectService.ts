import { injectable, inject } from 'tsyringe';
import Project from '@modules/project/infra/typeorm/entities/PublicProject';
import IProjectRepository from '../../repositories/IProjectRepository';

@injectable()
export default class ShowProjectService {
  constructor(
    @inject('ProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  public async execute(): Promise<Project[]> {
    const project = await this.projectRepository.findAllProject();

    return project;
  }
}
