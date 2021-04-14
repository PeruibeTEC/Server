import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import TouristSpot from '@modules/rawdata/infra/typeorm/entities/TouristSpot';
import ITouristSpotRepository from '../../repositories/ITouristSpotRepository';

interface IRequest {
  tourist_spot_id: string;
}

@injectable()
export default class ShowTouristSpotService {
  constructor(
    @inject('TouristSpotRepository')
    private touristSpotRepository: ITouristSpotRepository,
  ) {}

  public async execute({ tourist_spot_id }: IRequest): Promise<TouristSpot> {
    const checkTouristSpotExists = await this.touristSpotRepository.findById(
      tourist_spot_id,
    );

    if (!checkTouristSpotExists) {
      throw new AppError('Id not found.', 404);
    }

    return checkTouristSpotExists;
  }
}
