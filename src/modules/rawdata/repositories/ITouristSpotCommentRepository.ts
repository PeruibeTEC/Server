import ITouristSpotCommentDTO from '../dtos/ITouristSpotCommentDTO';
import TouristSpotComment from '../infra/typeorm/entities/TouristSpotComment';

export default interface ITouristSpotCommentRepository {
  findAllByTouristSpot(
    tourist_spot_id: string,
  ): Promise<TouristSpotComment[] | undefined>;
  create(data: ITouristSpotCommentDTO): Promise<TouristSpotComment>;
}
