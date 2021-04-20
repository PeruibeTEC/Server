import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreatePhotoPostService from '@modules/social/services/photoPost/CreatePhotoPostService';
import DeletePhotoPostService from '@modules/social/services/photoPost/DeletePhotoPostService';
import ShowPhotoPostService from '@modules/social/services/photoPost/ShowPhotoPostService';

export default class PhotoPostController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url, post_id } = request.body;

    const createPhotoPostService = container.resolve(CreatePhotoPostService);

    const post = await createPhotoPostService.execute({
      url,
      post_id,
    });

    return response.json(post);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { photo_post_id } = request.body;

    const deletePhotoPostService = container.resolve(DeletePhotoPostService);

    await deletePhotoPostService.execute({ photo_post_id });

    return response
      .status(200)
      .json({ message: `PhotoPost for id ${photo_post_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { post_id } = request.body;

    const showPhotoPostService = container.resolve(ShowPhotoPostService);

    const photo = await showPhotoPostService.execute({ post_id });

    return response.status(200).json(photo);
  }
}
