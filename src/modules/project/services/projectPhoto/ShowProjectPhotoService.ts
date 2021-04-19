import { injectable, inject } from 'tsyringe';

import ProjectPhoto from '../../infra/typeorm/entities/ProjectPhoto';
import IProjectPhotoRepository from '../../repositories/IPhotoProjectRepository';

interface IRequest {
  public_project_id: string;
}

@injectable()
export default class ShowProjectPhotoService {
  constructor(
    @inject('ProjectPhotoRepository')
    private projectPhotoRepository: IProjectPhotoRepository,
  ) {}

  public async execute({
    public_project_id,
  }: IRequest): Promise<ProjectPhoto[] | undefined> {
    const photoByProject = await this.projectPhotoRepository.findAllByProject(
      public_project_id,
    );

    return photoByProject;
  }
}
