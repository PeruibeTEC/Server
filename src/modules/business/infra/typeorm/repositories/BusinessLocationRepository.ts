import { getRepository, Repository } from 'typeorm';

import IBusinessLocationRepository from '@modules/business/repositories/IBusinessLocationRepository';
import IBusinessLocationDTO from '@modules/business/dtos/IBusinessLocationDTO';

import BusinessLocation from '../entities/BusinessLocation';

export default class BusinessLocationRepository
  implements IBusinessLocationRepository {
  private ormRepository: Repository<BusinessLocation>;

  constructor() {
    this.ormRepository = getRepository(BusinessLocation);
  }

  public async findById(id: string): Promise<BusinessLocation | undefined> {
    const businessLocation = await this.ormRepository.findOne(id);

    return businessLocation;
  }

  public async findByDistrict(
    district: string,
  ): Promise<BusinessLocation[] | undefined> {
    const businessLocation = await this.ormRepository.find({
      where: { district },
    });

    return businessLocation;
  }

  public async findAllBusinessLocation(): Promise<BusinessLocation[]> {
    const businessLocation = await this.ormRepository.find();

    return businessLocation;
  }

  public async findByBusiness(
    business_id: string,
  ): Promise<BusinessLocation | undefined> {
    const businessLocation = await this.ormRepository.findOne(business_id);

    return businessLocation;
  }

  public async create(
    businessLocationData: IBusinessLocationDTO,
  ): Promise<BusinessLocation> {
    const businessLocation = this.ormRepository.create(businessLocationData);

    await this.ormRepository.save(businessLocation);

    return businessLocation;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `BusinessLocation_id: ${id} deleted`;
  }

  public async save(
    businessLocation: BusinessLocation,
  ): Promise<BusinessLocation> {
    return this.ormRepository.save(businessLocation);
  }
}
