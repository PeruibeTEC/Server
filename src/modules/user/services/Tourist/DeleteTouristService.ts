import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import ITouristRepository from '../../repositories/ITouristRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  tourist_id: string;
}

@injectable()
export default class DeleteTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ tourist_id }: IRequest): Promise<void> {
    const checkTouristExists = await this.touristRepository.findById(
      tourist_id,
    );

    if (!checkTouristExists) {
      throw new AppError('Tourist not found.', 404);
    }

    await this.cacheProvider.invalidate('tourist-list');

    await this.touristRepository.delete(tourist_id);
  }
}
