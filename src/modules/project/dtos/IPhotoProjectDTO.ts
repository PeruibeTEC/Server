import Project from '../infra/typeorm/entities/PublicProject';

export default interface IPhotoProjectDTO {
  url: string;
  public_project_id: Project;
}
