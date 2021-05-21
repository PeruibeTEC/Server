import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ShowTouristSpotRatingByUserService from '@modules/rawdata/services/touristSpotRating/ShowTouristSpotRatingByUserService';

export default class TouristSpotRatingController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { tourist_spot_id } = request.body;

    const showTouristSpotRating = container.resolve(
      ShowTouristSpotRatingByUserService,
    );
    const touristSpotRating = await showTouristSpotRating.execute({
      user_id,
      tourist_spot_id,
    });

    return response.status(200).json(touristSpotRating);
  }
}
