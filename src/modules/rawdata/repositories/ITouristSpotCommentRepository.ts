import ITouristSpotCommentDTO from '../dtos/ITouristSpotCommentDTO';
import TouristSpotComment from '../infra/typeorm/entities/TouristSpotComment';

export default interface ITouristSpotCommentRepository {
  create(data: ITouristSpotCommentDTO): Promise<TouristSpotComment>;
}
