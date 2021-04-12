import ITouristSpotPhotoDTO from '../dtos/ITouristSpotPhotoDTO';
import TouristSpotPhoto from '../infra/typeorm/entities/TouristSpotPhoto';

export default interface ITouristSpotPhotoRepository {
  findById(id: string): Promise<TouristSpotPhoto | undefined>;
  findByTouristSpot(
    interestPointId: string,
  ): Promise<TouristSpotPhoto[] | undefined>;
  create(data: ITouristSpotPhotoDTO): Promise<TouristSpotPhoto>;
  delete(id: string): Promise<string>;
  save(interest_point_type: ITouristSpotPhotoDTO): Promise<TouristSpotPhoto>;
}
