import { injectable, inject } from 'tsyringe';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

@injectable()
export default class IndexBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute(
    business_id: string,
  ): Promise<BusinessProduct[] | undefined> {
    const businessProduct = await this.businessProductRepository.findAllProductsByBusiness(
      business_id,
    );

    return businessProduct;
  }
}
