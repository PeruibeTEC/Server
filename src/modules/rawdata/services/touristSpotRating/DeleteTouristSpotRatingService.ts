import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotRatingRepository from '@modules/rawdata/repositories/ITouristSpotRatingRepository';

interface IRequest {
  user_id: string;
  tourist_spot_rating_id: string;
}

@injectable()
export default class DeleteTouristSpotRatingService {
  constructor(
    @inject('TouristSpotRatingRepository')
    private touristSpotRatingRepository: ITouristSpotRatingRepository,
  ) {}

  public async execute({
    user_id,
    tourist_spot_rating_id,
  }: IRequest): Promise<void> {
    const touristSpotRating = await this.touristSpotRatingRepository.findById(
      tourist_spot_rating_id,
    );

    if (!touristSpotRating) {
      throw new AppError('Rating not found.', 404);
    }

    if (touristSpotRating.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to delete this rating.',
        403,
      );
    }

    await this.touristSpotRatingRepository.delete(tourist_spot_rating_id);
  }
}
