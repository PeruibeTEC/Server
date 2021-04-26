import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IPhotoProjectDTO from '@modules/project/dtos/IPhotoProjectDTO';
import { azureCreate } from '@shared/infra/azure/imageStorage/imageUpload';
import ProjectPhoto from '../../infra/typeorm/entities/ProjectPhoto';
import IPhotoProjectRepository from '../../repositories/IPhotoProjectRepository';

@injectable()
export default class CreatePhotoProjectService {
  constructor(
    @inject('ProjectPhotoRepository')
    private projectPhotoRepository: IPhotoProjectRepository,
  ) {}

  public async execute({
    url,
    public_project_id,
  }: IPhotoProjectDTO): Promise<ProjectPhoto> {
    try {
      url = azureCreate('project-images', url);
    } catch (err) {
      throw new AppError(
        'An error occurred while uploading the image, please try again later',
      );
    }

    const photoProject = this.projectPhotoRepository.create({
      url,
      public_project_id,
    });

    return photoProject;
  }
}
