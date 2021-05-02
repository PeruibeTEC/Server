import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessProductRepository from '../../repositories/IBusinessProductRepository';

interface IRequest {
  business_product_id: string;
}

@injectable()
export default class DeleteBusinessProductService {
  constructor(
    @inject('BusinessProductRepository')
    private businessProductRepository: IBusinessProductRepository,
  ) {}

  public async execute({ business_product_id }: IRequest): Promise<void> {
    const businessProduct = await this.businessProductRepository.findById(
      business_product_id,
    );

    if (!businessProduct) {
      throw new AppError('Business not found.', 404);
    }

    await this.businessProductRepository.delete(business_product_id);
  }
}
