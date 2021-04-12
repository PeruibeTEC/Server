import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import { azureCreate } from '@shared/infra/azure/imageUpload';

import ITouristSpotPhotoDTO from '@modules/rawdata/dtos/ITouristSpotPhotoDTO';
import TouristSpotPhoto from '../../infra/typeorm/entities/TouristSpotPhoto';
import ITouristSpotPhotoRepository from '../../repositories/ITouristSpotPhotoRepository';

@injectable()
export default class CreateTouristSpotPhotoService {
  constructor(
    @inject('TouristSpotPhotoRepository')
    private touristSpotPhotoRepository: ITouristSpotPhotoRepository,
  ) {}

  public async execute({
    tourist_spot_id,
    url,
  }: ITouristSpotPhotoDTO): Promise<TouristSpotPhoto> {
    try {
      url = azureCreate('tourist-spot-images', url);
    } catch (err) {
      throw new AppError(
        'An error occurred while uploading the image, please try again later',
      );
    }

    const touristSpotPhoto = this.touristSpotPhotoRepository.create({
      tourist_spot_id,
      url,
    });

    return touristSpotPhoto;
  }
}
