import { injectable, inject } from 'tsyringe';

import BusinessProduct from '../../infra/typeorm/entities/BusinessProduct';
import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

export interface IRequest {
  name: string;
  description: string;
  price: number;
  url: string;
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
    url,
    business_id,
  }: IRequest): Promise<BusinessProduct> {
    const businessProduct = this.businessProductRepository.create({
      name,
      description,
      price,
      url,
      business_id,
    });

    return businessProduct;
  }
}
