import { injectable, inject } from 'tsyringe';

import TouristSpot from '@modules/rawdata/infra/typeorm/entities/TouristSpot';
import ITouristSpotRepository from '../../repositories/ITouristSpotRepository';

@injectable()
export default class IndexTouristSpotService {
  constructor(
    @inject('TouristSpotRepository')
    private touristSpotRepository: ITouristSpotRepository,
  ) {}

  public async execute(): Promise<TouristSpot[]> {
    const touristSpot = await this.touristSpotRepository.findAll();

    return touristSpot;
  }
}
