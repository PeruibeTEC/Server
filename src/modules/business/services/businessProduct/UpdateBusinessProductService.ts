import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

export interface IRequest {
  name: string;
  description: string;
  price: number;
  photo_product_url: string;
  business_product_id: string;
  business_id: string;
}

@injectable()
export default class UpdateBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute({
    business_id,
    name,
    description,
    price,
    photo_product_url,
    business_product_id,
  }: IRequest): Promise<BusinessProduct> {
    const businessProduct = await this.businessProductRepository.findById(
      business_product_id,
    );

    if (!businessProduct) {
      throw new AppError('Business not found.', 404);
    }

    if (businessProduct.business_id !== business_id) {
      throw new AppError(
        'Business does not have permission to update this product.',
        403,
      );
    }

    Object.assign(businessProduct, {
      name,
      description,
      price,
      photo_product_url,
    });

    return this.businessProductRepository.save(businessProduct);
  }
}
