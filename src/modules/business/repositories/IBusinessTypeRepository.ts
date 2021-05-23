import BusinessType from '../infra/typeorm/entities/BusinessType';
import IBusinessTypeDTO from '../dtos/IBusinessTypeDTO';

export default interface IBusinessTypeRepository {
  findAllBusinessType(): Promise<BusinessType[]>;
  findById(id: string): Promise<BusinessType | undefined>;
  findByName(name: string): Promise<BusinessType | undefined>;
  create(data: IBusinessTypeDTO): Promise<BusinessType>;
  delete(id: string): Promise<string>;
  save(business_type: BusinessType): Promise<BusinessType>;
}
