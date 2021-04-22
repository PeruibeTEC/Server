import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCommentProjectService from '@modules/project/services/projectComment/CreateProjectCommentService';
import DeleteCommentProjectService from '@modules/project/services/projectComment/DeleteProjectCommentService';
import IndexCommentProjectService from '@modules/project/services/projectComment/IndexProjectCommentService';
import UpdateCommentProjectService from '@modules/project/services/projectComment/UpdateProjectCommentService';

export default class ProjectCommentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content, public_project_id } = request.body;
    const user_id = request.user.id;

    const createProjectComment = container.resolve(CreateCommentProjectService);

    const commentProject = await createProjectComment.execute({
      content,
      public_project_id,
      user_id,
    });

    return response.json(commentProject);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { comment_id, public_project_id } = request.body;
    const user_id = request.user.id;

    const deleteProjectComment = container.resolve(DeleteCommentProjectService);

    await deleteProjectComment.execute({
      comment_id,
      public_project_id,
      user_id,
    });

    return response.status(200).json({
      message: `Comment of the Project for id: ${comment_id} deleted `,
    });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { public_project_id } = request.body;

    const listCommentProject = container.resolve(IndexCommentProjectService);

    const comments = await listCommentProject.execute({ public_project_id });

    return response.status(200).json(comments);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { comment_id, public_project_id, content } = request.body;
    const user_id = request.user.id;

    const updateCommentProject = container.resolve(UpdateCommentProjectService);

    const project = await updateCommentProject.execute({
      public_project_id,
      comment_id,
      user_id,
      content,
    });

    return response.json(project);
  }
}
