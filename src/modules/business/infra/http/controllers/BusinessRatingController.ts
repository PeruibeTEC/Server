import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessRatingService from '@modules/business/services/businessRating/CreateBusinessRatingService';
import DeleteBusinessRatingService from '@modules/business/services/businessRating/DeleteBusinessRatingService';
import ShowBusinessRatingByUserService from '@modules/business/services/businessRating/ShowBusinessRatingByUserService';
import UpdateBusinessRatingService from '@modules/business/services/businessRating/UpdateBusinessRatingService';

export default class BusinessRatingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { value, business_id } = request.body;

    const createBusinessRating = container.resolve(CreateBusinessRatingService);

    const business = await createBusinessRating.execute({
      value,
      user_id,
      business_id,
    });

    return response.json(business);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { business_rating_id } = request.body;

    const deleteBusinessRatingService = container.resolve(
      DeleteBusinessRatingService,
    );

    await deleteBusinessRatingService.execute({ user_id, business_rating_id });

    return response
      .status(200)
      .json({ message: `Rating ${business_rating_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { business_id } = request.params;

    const showBusinessRating = container.resolve(
      ShowBusinessRatingByUserService,
    );
    const businessRating = await showBusinessRating.execute({
      user_id,
      business_id,
    });

    return response.status(200).json(businessRating);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { value, business_rating_id } = request.body;

    const updateBusinessRatingService = container.resolve(
      UpdateBusinessRatingService,
    );

    const business = await updateBusinessRatingService.execute({
      value,
      user_id,
      business_rating_id,
    });

    return response.json(business);
  }
}
