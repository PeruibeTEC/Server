import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IProjectRepository from '../../repositories/IProjectRepository';

interface IRequest {
  project_id: string;
}

@injectable()
export default class DeleteProjectService {
  constructor(
    @inject('ProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  public async execute({ project_id }: IRequest): Promise<void> {
    const checkProjectExists = await this.projectRepository.findById(
      project_id,
    );

    if (!checkProjectExists) {
      throw new AppError('Project not found.', 404);
    }

    await this.projectRepository.delete(project_id);
  }
}
