import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateProjectService from '@modules/project/services/project/CreateProjectService';
import DeleteProjectService from '@modules/project/services/project/DeleteProjectService';
import ShowProjectService from '@modules/project/services/project/ShowProjectService';
import IndexProjectService from '@modules/project/services/project/IndexProjectService';
import UpdateProjectService from '@modules/project/services/project/UpdateProjectService';

export default class ProjectController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      street,
      district,
      latitude,
      longitude,
      starting_date,
      ending_date,
      price,
    } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({
      name,
      street,
      district,
      latitude,
      longitude,
      starting_date,
      ending_date,
      price,
    });

    return response.json(project);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { project_id } = request.body;

    const deleteProject = container.resolve(DeleteProjectService);

    await deleteProject.execute({ project_id });

    return response.status(200).json({
      message: `Project for id: ${project_id} deleted `,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const project_id: string = (request.params as unknown) as string;

    const showProject = container.resolve(ShowProjectService);

    const project = await showProject.execute({
      project_id,
    });

    return response.status(200).json({ project });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listProject = container.resolve(IndexProjectService);

    const projects = await listProject.execute();

    return response.status(200).json(projects);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      project_id,
      name,
      street,
      district,
      latitude,
      longitude,
      starting_date,
      ending_date,
      price,
    } = request.body;

    const updateProject = container.resolve(UpdateProjectService);

    const project = await updateProject.execute({
      project_id,
      name,
      street,
      district,
      latitude,
      longitude,
      starting_date,
      ending_date,
      price,
    });

    return response.json(project);
  }
}
