import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/infra/http/errors/AppError';

// import IPhotoProjectDTO from '@modules/project/dtos/IPhotoProjectDTO';
// import ProjectPhoto from '../../infra/typeorm/entities/ProjectPhoto';
import IPhotoProjectRepository from '../../repositories/IPhotoProjectRepository';

@injectable()
export default class CreatePhotoProjectService {
  constructor(
    @inject('ProjectPhotoRepository')
    private projectPhotoRepository: IPhotoProjectRepository,
  ) {}
}
