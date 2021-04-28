import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessTypeDTO from '@modules/business/dtos/IBusinessTypeDTO';
import BusinessType from '../../infra/typeorm/entities/BusinessType';
import IBusinessTypeRepository from '../../repositories/IBusinessTypeRepository';

@injectable()
export default class CreateBusinessTypeService {
  constructor(
    @inject('BusinessTypeRepository')
    private businessTypeRepository: IBusinessTypeRepository,
  ) {}

  public async execute({ name }: IBusinessTypeDTO): Promise<BusinessType> {
    if (name.length > 200) {
      throw new AppError('Content has exceeded the character limit', 413);
    }

    const checkBusinessTypeExists = await this.businessTypeRepository.findByName(
      name,
    );
    if (checkBusinessTypeExists) {
      throw new AppError('Type already exists', 409);
    }

    const businessType = this.businessTypeRepository.create({
      name,
    });

    return businessType;
  }
}
