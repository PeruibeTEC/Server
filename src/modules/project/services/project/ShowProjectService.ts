import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import Project from '@modules/project/infra/typeorm/entities/PublicProject';
import IProjectRepository from '../../repositories/IProjectRepository';

interface IRequest {
  project_id: string;
}

@injectable()
export default class ShowProjectService {
  constructor(
    @inject('ProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<Project> {
    const checkProjectExists = await this.projectRepository.findById(
      project_id,
    );

    if (!checkProjectExists) {
      throw new AppError('Id of the project not found.', 404);
    }

    return checkProjectExists;
  }
}
