import ITouristSpotDTO from '../dtos/ITouristSpotDTO';
import TouristSpot from '../infra/typeorm/entities/TouristSpot';

export default interface ITouristSpotRepository {
  findAll(): Promise<TouristSpot[]>;
  findById(id: string): Promise<TouristSpot | undefined>;
  findByName(name: string): Promise<TouristSpot | undefined>;
  create(data: ITouristSpotDTO): Promise<TouristSpot>;
  delete(id: string): Promise<string>;
  save(interest_point_type: ITouristSpotDTO): Promise<TouristSpot>;
}
