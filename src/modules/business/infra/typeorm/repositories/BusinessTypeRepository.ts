import { getRepository, Repository } from 'typeorm';

import IBusinessTypeRepository from '@modules/business/repositories/IBusinessTypeRepository';
import IBusinessTypeDTO from '@modules/business/dtos/IBusinessTypeDTO';

import BusinessType from '../entities/BusinessType';

export default class BusinessTypeRepository implements IBusinessTypeRepository {
  private ormRepository: Repository<BusinessType>;

  constructor() {
    this.ormRepository = getRepository(BusinessType);
  }

  public async findById(id: string): Promise<BusinessType | undefined> {
    const businessType = await this.ormRepository.findOne(id);

    return businessType;
  }

  public async findByName(name: string): Promise<BusinessType | undefined> {
    const businessType = await this.ormRepository.findOne({
      where: { name },
    });

    return businessType;
  }

  public async findAllBusinessType(): Promise<BusinessType[]> {
    const businessType = await this.ormRepository.find();

    return businessType;
  }

  public async create(
    businessTypeData: IBusinessTypeDTO,
  ): Promise<BusinessType> {
    const businessType = this.ormRepository.create(businessTypeData);

    await this.ormRepository.save(businessType);

    return businessType;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `BusinessType_id: ${id} deleted`;
  }

  public async save(businessType: BusinessType): Promise<BusinessType> {
    return this.ormRepository.save(businessType);
  }
}
