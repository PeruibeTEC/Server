import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

export interface IRequest {
  name: string;
  description: string;
  price: number;
  url: string;
  business_product_id: string;
}

@injectable()
export default class UpdateBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
    url,
    business_product_id,
  }: IRequest): Promise<BusinessProduct> {
    const businessProduct = await this.businessProductRepository.findById(
      business_product_id,
    );

    if (!businessProduct) {
      throw new AppError('Business not found.', 404);
    }

    Object.assign(businessProduct, {
      name,
      description,
      price,
      url,
    });

    return this.businessProductRepository.save(businessProduct);
  }
}
