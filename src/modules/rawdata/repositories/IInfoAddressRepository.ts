import InfoAddress from '../infra/typeorm/entities/InfoAddress';
import ICreateInfoAddressDTO from '../dtos/ICreateInfoAddressDTO';

export default interface IInfoAddressRepository {
  findAllInfoAddress(expect_infoaddress_id?: string): Promise<InfoAddress[]>;
  findById(id: string): Promise<InfoAddress | undefined>;
  findByDistrict(district: string): Promise<InfoAddress | undefined>;
  create(data: ICreateInfoAddressDTO): Promise<InfoAddress>;
  delete(id: string): Promise<string>;
  save(info_address: ICreateInfoAddressDTO): Promise<InfoAddress>;
}
