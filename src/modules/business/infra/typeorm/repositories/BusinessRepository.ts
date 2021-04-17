import { getRepository, Repository } from 'typeorm';

import IBusinessRepository from '@modules/business/repositories/IBusinessRepository';
import IBusinessDTO from '@modules/business/dtos/IBusinessDTO';

import Business from '../entities/Business';

export default class BusinessRepository implements IBusinessRepository {
  private ormRepository: Repository<Business>;

  constructor() {
    this.ormRepository = getRepository(Business);
  }

  public async findById(id: string): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne(id);

    return business;
  }

  public async findByName(name: string): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne({
      where: { name },
    });

    return business;
  }

  public async findAllBusiness(): Promise<Business[]> {
    let business: Business[];

    // eslint-disable-next-line prefer-const
    business = await this.ormRepository.find();

    return business;
  }

  public async create(businessData: IBusinessDTO): Promise<Business> {
    const business = this.ormRepository.create(businessData);

    await this.ormRepository.save(business);

    return business;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Business_id: ${id} deleted`;
  }

  public async save(business: Business): Promise<Business> {
    return this.ormRepository.save(business);
  }
}
