import { inject, injectable } from 'tsyringe';

import Tourist from '@modules/user/infra/typeorm/entities/Tourist';
import ITouristRepository from '../../repositories/ITouristRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Tourist[]> {
    let tourist = await this.cacheProvider.recover<Tourist[]>(
      'tourist-list',
    )

    if (!tourist) {
      tourist = await this.touristRepository.findAllTourists();
      console.log('query');
      await this.cacheProvider.save('tourist-list', tourist);
    }

    return tourist;
  }
}
