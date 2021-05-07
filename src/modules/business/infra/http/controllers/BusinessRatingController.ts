import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessRatingService from '@modules/business/services/businessRating/CreateBusinessRatingService';
import DeleteBusinessRatingService from '@modules/business/services/businessRating/DeleteBusinessRatingService';
import ShowBusinessRatingService from '@modules/business/services/businessRating/ShowBusinessRatingService';
import UpdateBusinessRatingService from '@modules/business/services/businessRating/UpdateBusinessRatingService';

export default class BusinessRatingController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { value, user_id, business_id } = request.body;

    const createBusinessRating = container.resolve(CreateBusinessRatingService);

    const business = await createBusinessRating.execute({
      value,
      user_id,
      business_id,
    });

    return response.json(business);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { business_rating_id } = request.body;

    const deleteBusinessRatingService = container.resolve(
      DeleteBusinessRatingService,
    );

    await deleteBusinessRatingService.execute({ business_rating_id });

    return response
      .status(200)
      .json({ message: `Rating ${business_rating_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_rating_id } = request.body;

    const showBusinessRating = container.resolve(ShowBusinessRatingService);
    const businessRating = await showBusinessRating.execute({
      business_rating_id,
    });

    return response.status(200).json(businessRating);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { value, business_rating_id } = request.body;

    const updateBusinessRatingService = container.resolve(
      UpdateBusinessRatingService,
    );

    const business = await updateBusinessRatingService.execute({
      value,
      business_rating_id,
    });

    return response.json(business);
  }
}
