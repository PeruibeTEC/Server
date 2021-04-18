import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePostService from '@modules/social/services/post/CreatePostService';
import DeletePostService from '@modules/social/services/post/DeletePostService';
import IndexPostService from '@modules/social/services/post/IndexPostService';
import UpdatePostService from '@modules/social/services/post/UpdatePostService';

import User from '@modules/user/infra/typeorm/entities/User';

export default class PostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content, has_photo } = request.body;
    const user_id = (request.user.id as unknown) as User;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      content,
      has_photo,
      user_id,
    });

    return response.json(post);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;
    const user_id = (request.user.id as unknown) as User;

    const deletePostService = container.resolve(DeletePostService);

    await deletePostService.execute({ post_id, user_id });

    return response
      .status(200)
      .json({ message: `Post for id ${post_id} deleted ` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexPostService = container.resolve(IndexPostService);

    const posts = await indexPostService.execute();

    return response.status(200).json(posts);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { post_id, content } = request.body;
    const user_id = (request.user.id as unknown) as User;

    const updatePostService = container.resolve(UpdatePostService);

    const post = await updatePostService.execute({
      post_id,
      content,
      user_id,
    });

    return response.json(post);
  }
}
