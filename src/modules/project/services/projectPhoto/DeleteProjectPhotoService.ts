import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import { deleteImage } from '@shared/infra/azure/imageStorage/imageDelete';
import IProjectPhotoRepository from '../../repositories/IPhotoProjectRepository';

interface IRequest {
  photo_project_id: string;
}

@injectable()
export default class DeleteProjectPhotoService {
  constructor(
    @inject('ProjectPhotoRepository')
    private projectPhotoRepository: IProjectPhotoRepository,
  ) {}

  public async execute({ photo_project_id }: IRequest): Promise<void> {
    const photoProject = await this.projectPhotoRepository.findById(
      photo_project_id,
    );

    if (!photoProject) {
      throw new AppError('PProject Photo not found.', 404);
    }

    deleteImage('project-images', photoProject.url);

    await this.projectPhotoRepository.delete(photo_project_id);
  }
}
