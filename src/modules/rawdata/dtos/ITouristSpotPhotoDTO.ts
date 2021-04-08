import TouristSpot from '../infra/typeorm/entities/TouristSpot';

export default interface ITouristSpotPhotoDTO {
  url: string;
  id: string;
  tourist_spot_id: TouristSpot;
}
