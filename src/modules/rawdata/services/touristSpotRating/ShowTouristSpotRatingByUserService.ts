import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotRatingRepository from '@modules/rawdata/repositories/ITouristSpotRatingRepository';
import TouristSpotRating from '@modules/rawdata/infra/typeorm/entities/TouristSpotRating';

interface IRequest {
  user_id: string;
  tourist_spot_id: string;
}

@injectable()
export default class ShowTouristSpotRatingByUserService {
  constructor(
    @inject('TouristSpotRatingRepository')
    private touristSpotRatingRepository: ITouristSpotRatingRepository,
  ) {}

  public async execute({
    user_id,
    tourist_spot_id,
  }: IRequest): Promise<TouristSpotRating | undefined> {
    const touristSpotRating = await this.touristSpotRatingRepository.findByUserAndTouristSpot(
      user_id,
      tourist_spot_id,
    );

    if (!touristSpotRating) {
      throw new AppError('User not found.', 404);
    }

    return touristSpotRating;
  }
}
