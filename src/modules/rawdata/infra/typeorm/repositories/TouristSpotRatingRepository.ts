import { getRepository, Repository } from 'typeorm';

import ITouristSpotRatingRepository from '@modules/rawdata/repositories/ITouristSpotRatingRepository';
import TouristSpotRating from '../entities/TouristSpotRating';

export default class TouristSpotRatingRepository
  implements ITouristSpotRatingRepository {
  private ormRepository: Repository<TouristSpotRating>;

  constructor() {
    this.ormRepository = getRepository(TouristSpotRating);
  }

  public async findByUserAndTouristSpot(
    user_id: string,
    tourist_spot_id: string,
  ): Promise<TouristSpotRating | undefined> {
    const touristSpotRating = this.ormRepository.findOne({
      where: [{ user_id }, { tourist_spot_id }],
    });

    return touristSpotRating;
  }
}
