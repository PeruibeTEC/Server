import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePhotoProjectService from '@modules/project/services/projectPhoto/CreateProjectPhotoService';
import DeletePhotoProjectService from '@modules/project/services/projectPhoto/DeleteProjectPhotoService';
import ShowPhotoProjectService from '@modules/project/services/projectPhoto/ShowProjectPhotoService';

export default class ProjectPhotoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url, public_project_id } = request.body;

    const createProjectPhoto = container.resolve(CreatePhotoProjectService);

    const photoProject = await createProjectPhoto.execute({
      url,
      public_project_id,
    });

    return response.json(photoProject);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { photo_project_id } = request.body;

    const deleteProjectPhoto = container.resolve(DeletePhotoProjectService);

    await deleteProjectPhoto.execute({
      photo_project_id,
    });

    return response.status(200).json({
      message: `Photo of the Project for id: ${photo_project_id} deleted `,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { public_project_id } = request.body;

    const showPhotoProject = container.resolve(ShowPhotoProjectService);

    const photos = await showPhotoProject.execute({ public_project_id });

    return response.status(200).json(photos);
  }
}
