import User from '@modules/user/infra/typeorm/entities/User';
import PublicProject from '../infra/typeorm/entities/PublicProject';

export default interface ICommentProject {
  content: string;
  public_project_id: PublicProject;
  user_id: User;
}
