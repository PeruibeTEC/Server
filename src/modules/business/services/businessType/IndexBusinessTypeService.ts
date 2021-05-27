import { injectable, inject } from 'tsyringe';

import BusinessType from '../../infra/typeorm/entities/BusinessType';
import IBusinessTypeRepository from '../../repositories/IBusinessTypeRepository';

@injectable()
export default class IndexBusinessTypeService {
  constructor(
    @inject('BusinessTypeRepository')
    private businessTypeRepository: IBusinessTypeRepository,
  ) {}

  public async execute(): Promise<BusinessType[]> {
    const businessTypes = await this.businessTypeRepository.findAllBusinessType();

    return businessTypes;
  }
}
