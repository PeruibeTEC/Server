import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IProjectRepository from '@modules/project/repositories/IProjectRepository';
import Project from '@modules/project/infra/typeorm/entities/PublicProject';

interface IRequest {
  project_id: string;
  name: string;
  street: string;
  district: string;
  latitude: number;
  longitude: number;
  starting_date: Date;
  ending_date: Date;
  price: number;
}

@injectable()
export default class UpdateProjectService {
  constructor(
    @inject('ProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  public async execute({
    project_id,
    name,
    street,
    district,
    latitude,
    longitude,
    starting_date,
    ending_date,
    price,
  }: IRequest): Promise<Project> {
    const project = await this.projectRepository.findById(project_id);

    if (!project) {
      throw new AppError('Project not found.', 404);
    }

    const projectWithUpdatedName = await this.projectRepository.findByName(
      name,
    );

    if (projectWithUpdatedName && projectWithUpdatedName.id !== project_id) {
      throw new AppError('Name already in use.', 409);
    }

    Object.assign(project, {
      name,
      street,
      district,
      latitude,
      longitude,
      starting_date,
      ending_date,
      price,
    });

    return this.projectRepository.save(project);
  }
}
