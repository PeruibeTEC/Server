import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTouristSpotCommentService from '@modules/rawdata/services/touristSpotComment/CreateTouristSpotCommentService';
import DeleteTouristSpotCommentService from '@modules/rawdata/services/touristSpotComment/DeleteTouristSpotCommentService';
import IndexTouristSpotCommentService from '@modules/rawdata/services/touristSpotComment/IndexTouristSpotCommentService';
import UpdateTouristSpotCommentService from '@modules/rawdata/services/touristSpotComment/UpdateTouristSpotCommentService';

export default class TouristSpotCommentController {
  public async indexCommentByTouristSpot(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { tourist_spot_id } = request.params;

    const indexTouristSpotComment = container.resolve(
      IndexTouristSpotCommentService,
    );

    const touristSpotComment = await indexTouristSpotComment.execute(
      tourist_spot_id,
    );

    return response.status(200).json(touristSpotComment);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content, tourist_spot_id } = request.body;

    const createTouristSpotComment = container.resolve(
      CreateTouristSpotCommentService,
    );

    const touristSpotComment = await createTouristSpotComment.execute({
      content,
      user_id,
      tourist_spot_id,
    });

    return response.json(touristSpotComment);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { tourist_spot_comment_id } = request.body;

    const deleteTouristSpotCommentService = container.resolve(
      DeleteTouristSpotCommentService,
    );

    await deleteTouristSpotCommentService.execute({
      tourist_spot_comment_id,
      user_id,
    });

    return response
      .status(200)
      .json({ message: `Comment ${tourist_spot_comment_id} deleted ` });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content, tourist_spot_comment_id } = request.body;

    const updateTouristSpotCommentService = container.resolve(
      UpdateTouristSpotCommentService,
    );

    const touristSpotComment = await updateTouristSpotCommentService.execute({
      content,
      tourist_spot_comment_id,
      user_id,
    });

    return response.json(touristSpotComment);
  }
}
