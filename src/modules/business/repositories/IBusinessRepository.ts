import Business from '../infra/typeorm/entities/Business';
import IBusinessDTO from '../dtos/IBusinessDTO';

export default interface IBusinessRepository {
  findAllBusiness(): Promise<Business[]>;
  findById(id: string): Promise<Business | undefined>;
  findByName(name: string): Promise<Business | undefined>;
  create(data: IBusinessDTO): Promise<Business>;
  delete(id: string): Promise<string>;
  save(business: Business): Promise<Business>;
}
