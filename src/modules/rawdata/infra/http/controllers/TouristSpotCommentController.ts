import CreateTouristSpotCommentService from '@modules/rawdata/services/touristSpotComment/CreateTouristSpotCommentService';
import IndexTouristSpotCommentService from '@modules/rawdata/services/touristSpotComment/IndexTouristSpotCommentService';
import { Request, Response } from 'express';

import { container } from 'tsyringe';

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
}
