import ITouristSpotCommentDTO from '../dtos/ITouristSpotCommentDTO';
import TouristSpotComment from '../infra/typeorm/entities/TouristSpotComment';

export default interface ITouristSpotCommentRepository {
  findAllByTouristSpot(
    tourist_spot_id: string,
  ): Promise<TouristSpotComment[] | undefined>;
  findById(id: string): Promise<TouristSpotComment | undefined>;
  findByUser(user_id: string): Promise<TouristSpotComment | undefined>;
  create(data: ITouristSpotCommentDTO): Promise<TouristSpotComment>;
  delete(id: string): Promise<string>;
  save(tourist_spot_comment: TouristSpotComment): Promise<TouristSpotComment>;
}
