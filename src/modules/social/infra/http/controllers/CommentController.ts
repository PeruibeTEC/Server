import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateCommentService from '@modules/social/services/comment/CreateCommentService';
import DeleteCommentService from '@modules/social/services/comment/DeleteCommentService';
import IndexCommentService from '@modules/social/services/comment/IndexCommentService';
import UpdateCommentService from '@modules/social/services/comment/UpdateCommentService';

export default class CommentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content, post_id } = request.body;
    const user_id = request.user.id;

    const createCommentService = container.resolve(CreateCommentService);

    const comment = await createCommentService.execute({
      content,
      post_id,
      user_id,
    });

    return response.json(comment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { post_id, comment_id } = request.body;
    const user_id = request.user.id;

    const deleteCommentService = container.resolve(DeleteCommentService);

    await deleteCommentService.execute({ post_id, user_id, comment_id });

    return response
      .status(200)
      .json({ message: `Comment for id ${comment_id} deleted` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;

    const indexCommentService = container.resolve(IndexCommentService);

    const comments = await indexCommentService.execute({ post_id });

    return response.status(200).json(comments);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { post_id, comment_id, content } = request.body;
    const user_id = request.user.id;

    const updateCommentService = container.resolve(UpdateCommentService);

    const comment = await updateCommentService.execute({
      post_id,
      user_id,
      comment_id,
      content,
    });

    return response.json(comment);
  }
}
