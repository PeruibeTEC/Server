import BusinessContact from '../infra/typeorm/entities/BusinessContact';
import IBusinessContactDTO from '../dtos/IBusinessContactDTO';

export default interface IBusinessContactRepository {
  findAllBusinessContact(): Promise<BusinessContact[]>;
  findById(id: string): Promise<BusinessContact | undefined>;
  findByName(name: string): Promise<BusinessContact | undefined>;
  create(data: IBusinessContactDTO): Promise<BusinessContact>;
  delete(id: string): Promise<string>;
  save(business_contact: IBusinessContactDTO): Promise<BusinessContact>;
}
