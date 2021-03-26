import InfoType from '../infra/typeorm/entities/InfoType';
import ICreateInfoTypeDTO from '../dtos/ICreateInfoTypeDTO';

export default interface IInfoTypeRepository {
  findAllInfoType(expect_infotype_id?: string): Promise<InfoType[]>;
  findById(id: string): Promise<InfoType | undefined>;
  findByName(name: string): Promise<InfoType | undefined>;
  create(data: ICreateInfoTypeDTO): Promise<InfoType>;
  delete(id: string): Promise<string>;
  save(info_type: ICreateInfoTypeDTO): Promise<InfoType>;
}
