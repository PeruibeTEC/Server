import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ShowTouristSpotRatingByUserService from '@modules/rawdata/services/touristSpotRating/ShowTouristSpotRatingByUserService';
import CreateTouristSpotRatingService from '@modules/rawdata/services/touristSpotRating/CreateTouristSpotRatingService';
import DeleteTouristSpotRatingService from '@modules/rawdata/services/touristSpotRating/DeleteTouristSpotRatingService';
import UpdateTouristSpotRatingService from '@modules/rawdata/services/touristSpotRating/UpdateTouristSpotRatingService';

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

  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { value, tourist_spot_id } = request.body;

    const createTouristSpotRating = container.resolve(
      CreateTouristSpotRatingService,
    );

    const touristSpotRating = await createTouristSpotRating.execute({
      value,
      user_id,
      tourist_spot_id,
    });

    return response.json(touristSpotRating);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { tourist_spot_rating_id } = request.body;

    const deleteTouristSpotRating = container.resolve(
      DeleteTouristSpotRatingService,
    );

    await deleteTouristSpotRating.execute({ user_id, tourist_spot_rating_id });

    return response
      .status(200)
      .json({ message: `Rating ${tourist_spot_rating_id} deleted` });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { value, tourist_spot_rating_id } = request.body;

    const updateTouristSpotRating = container.resolve(
      UpdateTouristSpotRatingService,
    );

    const touristSpotRating = await updateTouristSpotRating.execute({
      value,
      user_id,
      tourist_spot_rating_id,
    });

    return response.json(touristSpotRating);
  }
}
