import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

interface IRequest {
  business_product_id: string;
}

@injectable()
export default class ShowBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute({
    business_product_id,
  }: IRequest): Promise<BusinessProduct | undefined> {
    const businessProduct = await this.businessProductRepository.findById(
      business_product_id,
    );

    if (!businessProduct) {
      throw new AppError('Business Product not found.', 404);
    }

    return businessProduct;
  }
}
