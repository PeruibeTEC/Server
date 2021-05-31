import { getRepository, Repository } from 'typeorm';

import ITouristSpotRatingRepository from '@modules/rawdata/repositories/ITouristSpotRatingRepository';
import ITouristSpotRatingDTO from '@modules/rawdata/dtos/ITouristSpotRatingDTO';
import TouristSpotRating from '../entities/TouristSpotRating';

export default class TouristSpotRatingRepository
  implements ITouristSpotRatingRepository {
  private ormRepository: Repository<TouristSpotRating>;

  constructor() {
    this.ormRepository = getRepository(TouristSpotRating);
  }

  public async findById(id: string): Promise<TouristSpotRating | undefined> {
    const touristSpotRating = await this.ormRepository.findOne(id);

    return touristSpotRating;
  }

  public async findByUserAndTouristSpot(
    user_id: string,
    tourist_spot_id: string,
  ): Promise<TouristSpotRating | undefined> {
    const touristSpotRating = this.ormRepository.findOne({
      where: [{ user_id, tourist_spot_id }],
    });

    return touristSpotRating;
  }

  public async create(
    touristSpotRatingData: ITouristSpotRatingDTO,
  ): Promise<TouristSpotRating> {
    const touristSpotRating = this.ormRepository.create(touristSpotRatingData);

    await this.ormRepository.save(touristSpotRating);

    return touristSpotRating;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `TouristSpotRating_id: ${id} deleted`;
  }

  public async save(
    tourist_spot_rating: TouristSpotRating,
  ): Promise<TouristSpotRating> {
    return this.ormRepository.save(tourist_spot_rating);
  }
}
