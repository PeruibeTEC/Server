import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotRepository from '../../repositories/ITouristSpotRepository';

interface IRequest {
  tourist_spot_id: string;
}

@injectable()
export default class DeleteTouristSpotService {
  constructor(
    @inject('TouristSpotRepository')
    private touristSpotRepository: ITouristSpotRepository,
  ) {}

  public async execute({ tourist_spot_id }: IRequest): Promise<void> {
    const checkTouristSpotExists = await this.touristSpotRepository.findById(
      tourist_spot_id,
    );

    if (!checkTouristSpotExists) {
      throw new AppError('Tourist Spot not found.', 404);
    }

    await this.touristSpotRepository.delete(tourist_spot_id);
  }
}
