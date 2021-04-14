import TouristSpot from '../infra/typeorm/entities/TouristSpot';

export default interface ITouristSpotPhotoDTO {
  url: string;
  tourist_spot_id: TouristSpot;
}
