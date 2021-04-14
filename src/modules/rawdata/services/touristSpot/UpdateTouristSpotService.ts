import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import TouristSpot from '@modules/rawdata/infra/typeorm/entities/TouristSpot';
import ITouristSpotRepository from '../../repositories/ITouristSpotRepository';

interface IRequest {
  tourist_spot_id: string;
  name: string;
  description: string;
  latitude: string;
  longitude: string;
}

@injectable()
export default class UpdateTouristSpotService {
  constructor(
    @inject('TouristSpotRepository')
    private touristSpotRepository: ITouristSpotRepository,
  ) {}

  public async execute({
    tourist_spot_id,
    name,
    description,
    latitude,
    longitude,
  }: IRequest): Promise<TouristSpot> {
    const touristSpot = await this.touristSpotRepository.findById(
      tourist_spot_id,
    );

    if (!touristSpot) {
      throw new AppError('Tourist Spot not found.', 404);
    }

    const touristSpotWithUpdatedName = await this.touristSpotRepository.findByName(
      name,
    );

    if (
      touristSpotWithUpdatedName &&
      touristSpotWithUpdatedName.id !== tourist_spot_id
    ) {
      throw new AppError('Name already in use.', 409);
    }

    Object.assign(touristSpot, { name, description, latitude, longitude });

    return this.touristSpotRepository.save(touristSpot);
  }
}
