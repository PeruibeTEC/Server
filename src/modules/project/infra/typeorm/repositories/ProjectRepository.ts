import { getRepository, Repository } from 'typeorm';

import IProjectRepository from '@modules/project/repositories/IProjectRepository';
import IProjectDTO from '@modules/project/dtos/IProjectDTO';
import Project from '../entities/PublicProject';

export default class ProjectRepository implements IProjectRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findAllProject(): Promise<Project[]> {
    const project = await this.ormRepository.find();

    return project;
  }

  public async findById(id: string): Promise<Project | undefined> {
    const project = await this.ormRepository.findOne(id);

    return project;
  }

  public async create(projectData: IProjectDTO): Promise<Project> {
    const project = this.ormRepository.create(projectData);

    await this.ormRepository.save(project);

    return project;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Project_id: ${id} deleted`;
  }

  public async save(projectData: Project): Promise<Project> {
    return this.ormRepository.save(projectData);
  }
}
