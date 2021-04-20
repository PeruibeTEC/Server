import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateLikeService from '@modules/social/services/like/CreateLikeService';
import DeleteLikeService from '@modules/social/services/like/DeleteLikeService';
import IndexLikeService from '@modules/social/services/like/IndexLikeService';

export default class LikeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;
    const user_id = request.user.id;

    const createLikeService = container.resolve(CreateLikeService);

    const like = await createLikeService.execute({
      post_id,
      user_id,
    });

    return response.json(like);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { post_id, like_id } = request.body;
    const user_id = request.user.id;

    const deleteLikeService = container.resolve(DeleteLikeService);

    await deleteLikeService.execute({ post_id, user_id, like_id });

    return response
      .status(200)
      .json({ message: `Like for id ${like_id} deleted` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;

    const indexLikeService = container.resolve(IndexLikeService);

    const likesByPost = await indexLikeService.execute({ post_id });

    return response.status(200).json(likesByPost);
  }
}
