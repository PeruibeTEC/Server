import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessTypeRepository from '../../repositories/IBusinessTypeRepository';

interface IRequest {
  business_type_id: string;
}

@injectable()
export default class DeleteBusinessTypeService {
  constructor(
    @inject('BusinessTypeRepository')
    private businessTypeRepository: IBusinessTypeRepository,
  ) {}

  public async execute({ business_type_id }: IRequest): Promise<void> {
    const businessType = await this.businessTypeRepository.findById(
      business_type_id,
    );

    if (!businessType) {
      throw new AppError('Business Type not found.', 404);
    }

    await this.businessTypeRepository.delete(business_type_id);
  }
}
