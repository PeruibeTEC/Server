import { getRepository, Repository } from 'typeorm';

import IPhotoProjectRepository from '@modules/project/repositories/IPhotoProjectRepository';
import IPhotoProjectDTO from '@modules/project/dtos/IPhotoProjectDTO';

import PhotoProject from '../entities/ProjectPhoto';

export default class PhotoProjectRepository implements IPhotoProjectRepository {
  private ormRepository: Repository<PhotoProject>;

  constructor() {
    this.ormRepository = getRepository(PhotoProject);
  }

  public async findAllByProject(): Promise<PhotoProject[]> {
    const photosProject = await this.ormRepository.find();

    return photosProject;
  }

  public async findById(id: string): Promise<PhotoProject | undefined> {
    const photosProject = await this.ormRepository.findOne(id);

    return photosProject;
  }

  public async create(
    photoProjectData: IPhotoProjectDTO,
  ): Promise<PhotoProject> {
    const photoProject = this.ormRepository.create(photoProjectData);

    await this.ormRepository.save(photoProject);

    return photoProject;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `photoProject_id: ${id} deleted`;
  }

  public async save(photoProject: PhotoProject): Promise<PhotoProject> {
    return this.ormRepository.save(photoProject);
  }
}
