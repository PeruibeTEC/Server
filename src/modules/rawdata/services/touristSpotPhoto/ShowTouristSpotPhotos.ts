import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import TouristSpotPhoto from '@modules/rawdata/infra/typeorm/entities/TouristSpotPhoto';
import ITouristSpotPhotoRepository from '../../repositories/ITouristSpotPhotoRepository';

interface IRequest {
  tourist_spot_id: string;
}

@injectable()
export default class ShowTouristSpotPhotosService {
  constructor(
    @inject('TouristSpotPhotoRepository')
    private touristSpotPhotoRepository: ITouristSpotPhotoRepository,
  ) {}

  public async execute({
    tourist_spot_id,
  }: IRequest): Promise<TouristSpotPhoto[]> {
    const checkTouristSpotExists = await this.touristSpotPhotoRepository.findByTouristSpot(
      tourist_spot_id,
    );

    if (!checkTouristSpotExists) {
      throw new AppError('Tourist Spot not found.', 404);
    }

    return checkTouristSpotExists;
  }
}
