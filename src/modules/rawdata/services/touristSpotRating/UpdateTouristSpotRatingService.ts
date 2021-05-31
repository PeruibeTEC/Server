import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotRatingRepository from '@modules/rawdata/repositories/ITouristSpotRatingRepository';
import TouristSpotRating from '@modules/rawdata/infra/typeorm/entities/TouristSpotRating';

interface IRequest {
  value: number;
  user_id: string;
  tourist_spot_rating_id: string;
}

@injectable()
export default class UpdateTouristSpotRatingService {
  constructor(
    @inject('TouristSpotRatingRepository')
    private touristSpotRatingRepository: ITouristSpotRatingRepository,
  ) {}

  public async execute({
    value,
    user_id,
    tourist_spot_rating_id,
  }: IRequest): Promise<TouristSpotRating> {
    const touristSpotRating = await this.touristSpotRatingRepository.findById(
      tourist_spot_rating_id,
    );

    if (!touristSpotRating) {
      throw new AppError('Rating not found.', 404);
    }

    const checkRatingSize = value;

    if (checkRatingSize > 5) {
      throw new AppError('Rating is above number limit', 413);
    }

    if (touristSpotRating.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to update this rating.',
        403,
      );
    }

    Object.assign(touristSpotRating, { value });

    return this.touristSpotRatingRepository.save(touristSpotRating);
  }
}
