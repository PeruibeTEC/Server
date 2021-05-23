import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotRatingRepository from '@modules/rawdata/repositories/ITouristSpotRatingRepository';
import TouristSpotRating from '@modules/rawdata/infra/typeorm/entities/TouristSpotRating';

interface IRequest {
  value: number;
  user_id: string;
  tourist_spot_id: string;
}

@injectable()
export default class CreateTouristSpotRatingService {
  constructor(
    @inject('TouristSpotRatingRepository')
    private touristSpotRatingRepository: ITouristSpotRatingRepository,
  ) {}

  public async execute({
    value,
    user_id,
    tourist_spot_id,
  }: IRequest): Promise<TouristSpotRating> {
    if (value > 5) {
      throw new AppError('Rating is above number limit', 413);
    }

    const ratingExists = await this.touristSpotRatingRepository.findByUserAndTouristSpot(
      user_id,
      tourist_spot_id,
    );

    if (ratingExists) {
      throw new AppError('A User can only give one rating.', 409);
    }

    const touristSpotRating = this.touristSpotRatingRepository.create({
      value,
      user_id,
      tourist_spot_id,
    });

    return touristSpotRating;
  }
}
