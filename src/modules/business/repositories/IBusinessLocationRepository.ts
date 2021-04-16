import BusinessLocation from '../infra/typeorm/entities/BusinessLocation';
import IBusinessLocationDTO from '../dtos/IBusinessLocationDTO';

export default interface IBusinessLocationRepository {
  findAllBusinessLocation(): Promise<BusinessLocation[]>;
  findById(id: string): Promise<BusinessLocation | undefined>;
  findByDistrict(district: string): Promise<BusinessLocation | undefined>;
  create(data: IBusinessLocationDTO): Promise<BusinessLocation>;
  delete(id: string): Promise<string>;
  save(business_location: IBusinessLocationDTO): Promise<BusinessLocation>;
}
