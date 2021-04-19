import Project from '../infra/typeorm/entities/PublicProject';
import IProjectDTO from '../dtos/IProjectDTO';

export default interface IProjectRepository {
  findAllProject(): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  findByName(name: string): Promise<Project | undefined>;
  create(data: IProjectDTO): Promise<Project>;
  delete(id: string): Promise<string>;
  save(project: IProjectDTO): Promise<Project>;
}
