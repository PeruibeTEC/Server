import { injectable, inject } from 'tsyringe';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

@injectable()
export default class IndexBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute(): Promise<BusinessProduct[]> {
    const businessProduct = await this.businessProductRepository.findAllBusinessProduct();

    return businessProduct;
  }
}
