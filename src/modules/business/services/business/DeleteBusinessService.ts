import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessRepository from '../../repositories/IBusinessRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  business_id: string;
}

@injectable()
export default class DeleteBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ business_id }: IRequest): Promise<void> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    if (business.id !== business_id) {
      throw new AppError(
        'Business does not have permission to delete this business.',
        403,
      );
    }

    await this.cacheProvider.invalidate('business-list');

    await this.businessRepository.delete(business_id);
  }
}
