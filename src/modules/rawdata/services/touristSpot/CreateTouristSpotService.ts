import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotDTO from '@modules/rawdata/dtos/ITouristSpotDTO';
import TouristSpot from '../../infra/typeorm/entities/TouristSpot';
import ITouristSpotRepository from '../../repositories/ITouristSpotRepository';

@injectable()
export default class CreateTouristSpotService {
  constructor(
    @inject('TouristSpotRepository')
    private touristSpotRepository: ITouristSpotRepository,
  ) {}

  public async execute({
    name,
    description,
    latitude,
    longitude,
  }: ITouristSpotDTO): Promise<TouristSpot> {
    const checkTouristSpotExists = await this.touristSpotRepository.findByName(
      name,
    );

    if (checkTouristSpotExists) {
      throw new AppError('Name already used.', 409);
    }

    const touristSpot = this.touristSpotRepository.create({
      name,
      description,
      latitude,
      longitude,
    });

    return touristSpot;
  }
}
