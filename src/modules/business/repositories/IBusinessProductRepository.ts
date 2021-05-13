import BusinessProduct from '../infra/typeorm/entities/BusinessProduct';
import IBusinessProductDTO from '../dtos/IBusinessProductDTO';

export default interface IBusinessProductRepository {
  findAllBusinessProduct(): Promise<BusinessProduct[]>;
  findAllProductsByBusiness(
    business_id: string,
  ): Promise<BusinessProduct[] | undefined>;
  findById(id: string): Promise<BusinessProduct | undefined>;
  findByName(name: string): Promise<BusinessProduct | undefined>;
  create(data: IBusinessProductDTO): Promise<BusinessProduct>;
  delete(id: string): Promise<string>;
  save(business_product: BusinessProduct): Promise<BusinessProduct>;
}
