import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IProjectDTO from '@modules/project/dtos/IProjectDTO';
import Project from '../../infra/typeorm/entities/PublicProject';
import IProjectRepository from '../../repositories/IProjectRepository';

@injectable()
export default class CreateProjectService {
  constructor(
    @inject('ProjectRepository')
    private projectRepository: IProjectRepository,
  ) {}

  public async execute({
    name,
    street,
    district,
    latitude,
    longitude,
    starting_date,
    ending_date,
    price,
  }: IProjectDTO): Promise<Project> {
    const checkProjectExists = await this.projectRepository.findByName(name);

    if (checkProjectExists) {
      throw new AppError('Name already used.', 409);
    }

    const project = this.projectRepository.create({
      name,
      street,
      district,
      latitude,
      longitude,
      starting_date,
      ending_date,
      price,
    });

    return project;
  }
}
