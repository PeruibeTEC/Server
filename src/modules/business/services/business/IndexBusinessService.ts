import { injectable, inject } from 'tsyringe';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Business[]> {
    let business = await this.cacheProvider.recover<Business[]>(
      'business-list',
    )

    if (!business) {
      business = await this.businessRepository.findAllBusiness();
      
      await this.cacheProvider.save('business-list', business);
    }

    return business;
  }
}
