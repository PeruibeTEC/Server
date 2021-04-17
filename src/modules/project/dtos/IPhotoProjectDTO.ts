import ProjectComment from '../infra/typeorm/entities/ProjectComment';

export default interface IPhotoProjectDTO {
  url: string;
  project_comment_id: ProjectComment;
}
