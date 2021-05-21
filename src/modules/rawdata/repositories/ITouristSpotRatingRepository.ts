import TouristSpotRating from '../infra/typeorm/entities/TouristSpotRating';

export default interface ITouristSpotRatingRepository {
  findByUserAndTouristSpot(
    user_id: string,
    tourist_spot_id: string,
  ): Promise<TouristSpotRating | undefined>;
}
