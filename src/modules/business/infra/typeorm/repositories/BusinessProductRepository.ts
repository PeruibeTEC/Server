import { getRepository, Repository } from 'typeorm';

import IBusinessProductRepository from '@modules/business/repositories/IBusinessProductRepository';
import IBusinessProductDTO from '@modules/business/dtos/IBusinessProductDTO';

import BusinessProduct from '../entities/BusinessProduct';

export default class BusinessProductRepository
  implements IBusinessProductRepository {
  private ormRepository: Repository<BusinessProduct>;

  constructor() {
    this.ormRepository = getRepository(BusinessProduct);
  }

  public async findById(id: string): Promise<BusinessProduct | undefined> {
    const businessProduct = await this.ormRepository.findOne(id);

    return businessProduct;
  }

  public async findByName(name: string): Promise<BusinessProduct | undefined> {
    const businessProduct = await this.ormRepository.findOne({
      where: { name },
    });

    return businessProduct;
  }

  public async findAllBusinessProduct(): Promise<BusinessProduct[]> {
    const businessProduct = await this.ormRepository.find();

    return businessProduct;
  }

  public async create(
    businessProductData: IBusinessProductDTO,
  ): Promise<BusinessProduct> {
    const businessProduct = this.ormRepository.create(businessProductData);

    await this.ormRepository.save(businessProduct);

    return businessProduct;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `BusinessProduct_id: ${id} deleted`;
  }

  public async save(
    businessProduct: BusinessProduct,
  ): Promise<BusinessProduct> {
    return this.ormRepository.save(businessProduct);
  }
}
