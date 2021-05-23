import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessType from '../../infra/typeorm/entities/BusinessType';
import IBusinessTypeRepository from '../../repositories/IBusinessTypeRepository';

interface IRequest {
  business_type_id: string;
}

@injectable()
export default class ShowBusinessTypeService {
  constructor(
    @inject('BusinessTypeRepository')
    private businessTypeRepository: IBusinessTypeRepository,
  ) {}

  public async execute({
    business_type_id,
  }: IRequest): Promise<BusinessType | undefined> {
    const businessType = await this.businessTypeRepository.findById(
      business_type_id,
    );

    if (!businessType) {
      throw new AppError('Business Type not found.', 404);
    }

    return businessType;
  }
}
