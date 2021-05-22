import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

export interface IRequest {
  name: string;
  description: string;
  price: number;
  photo_product_url: string;
  business_id: string;
}

@injectable()
export default class CreateBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute({
    name,
    description,
    price,
    photo_product_url,
    business_id,
  }: IRequest): Promise<BusinessProduct> {
    const businessProduct = await this.businessProductRepository.create({
      name,
      description,
      price,
      photo_product_url,
      business_id,
    });

    if (businessProduct.business_id !== business_id) {
      throw new AppError(
        'Business does not have permission to create this product.',
        403,
      );
    }

    return businessProduct;
  }
}
