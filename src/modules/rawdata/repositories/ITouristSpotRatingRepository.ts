import ITouristSpotRatingDTO from '../dtos/ITouristSpotRatingDTO';
import TouristSpotRating from '../infra/typeorm/entities/TouristSpotRating';

export default interface ITouristSpotRatingRepository {
  findById(id: string): Promise<TouristSpotRating | undefined>;
  findByUserAndTouristSpot(
    user_id: string,
    tourist_spot_id: string,
  ): Promise<TouristSpotRating | undefined>;
  create(data: ITouristSpotRatingDTO): Promise<TouristSpotRating>;
  delete(id: string): Promise<string>;
  save(tourist_spot_rating: TouristSpotRating): Promise<TouristSpotRating>;
}
