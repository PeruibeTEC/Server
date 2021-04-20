import PhotoProject from '../infra/typeorm/entities/ProjectPhoto';
import IPhotoProjectDTO from '../dtos/IPhotoProjectDTO';

export default interface IPhotoProjectRepository {
  findAllByProject(
    public_project_id: string,
  ): Promise<PhotoProject[] | undefined>;
  findById(id: string): Promise<PhotoProject | undefined>;
  create(data: IPhotoProjectDTO): Promise<PhotoProject>;
  delete(id: string): Promise<string>;
  save(photo_project: PhotoProject): Promise<PhotoProject>;
}
