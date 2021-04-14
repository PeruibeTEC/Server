import { injectable, inject } from 'tsyringe';
import { deleteImage } from '@shared/infra/azure/imageStorage/imageDelete';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotPhotoRepository from '../../repositories/ITouristSpotPhotoRepository';

interface IRequest {
  tourist_spot_photo_id: string;
}

@injectable()
export default class DeleteTouristSpotPhotoService {
  constructor(
    @inject('TouristSpotPhotoRepository')
    private touristSpotPhotoRepository: ITouristSpotPhotoRepository,
  ) {}

  public async execute({ tourist_spot_photo_id }: IRequest): Promise<void> {
    const checkTouristSpotPhotoExists = await this.touristSpotPhotoRepository.findById(
      tourist_spot_photo_id,
    );

    if (!checkTouristSpotPhotoExists) {
      throw new AppError('Tourist Spot Photo not found.', 404);
    }

    deleteImage('tourist-spot-images', checkTouristSpotPhotoExists.url);

    await this.touristSpotPhotoRepository.delete(tourist_spot_photo_id);
  }
}
