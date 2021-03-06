import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessType from '../../infra/typeorm/entities/BusinessType';
import IBusinessTypeRepository from '../../repositories/IBusinessTypeRepository';

interface IRequest {
  business_type_id: string;
  name: string;
}

@injectable()
export default class UpdateBusinessTypeService {
  constructor(
    @inject('BusinessTypeRepository')
    private businessTypeRepository: IBusinessTypeRepository,
  ) {}

  public async execute({
    business_type_id,
    name,
  }: IRequest): Promise<BusinessType> {
    const businessType = await this.businessTypeRepository.findById(
      business_type_id,
    );

    if (!businessType) {
      throw new AppError('Business Type not found.', 404);
    }

    if (name.length > 200) {
      throw new AppError('Content has exceeded the character limit', 413);
    }

    Object.assign(businessType, { name });

    return this.businessTypeRepository.save(businessType);
  }
}
