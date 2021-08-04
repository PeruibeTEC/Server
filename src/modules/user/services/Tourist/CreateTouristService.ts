import { inject, injectable } from 'tsyringe';

import ITouristDTO from '@modules/user/dtos/ITouristDTO';
import Tourist from '../../infra/typeorm/entities/Tourist';
import ITouristRepository from '../../repositories/ITouristRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class CreateTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    state,
    city,
    is_foreigner,
    country_foreigner,
    user_id,
  }: ITouristDTO): Promise<Tourist> {
    const tourist = this.touristRepository.create({
      state,
      city,
      is_foreigner,
      country_foreigner,
      user_id,
    });

    await this.cacheProvider.invalidate('tourist-list');

    return tourist;
  }
}
