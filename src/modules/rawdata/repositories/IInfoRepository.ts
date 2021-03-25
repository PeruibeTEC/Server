import Info from '../infra/typeorm/entities/Info';
import ICreateInfoDTO from '../dtos/ICreateInfoDTO';

export default interface IInfoRepository {
  findAllInfo(expect_info_id?: string): Promise<Info[]>;
  findById(id: string): Promise<Info | undefined>;
  findByTel(telephone: string): Promise<Info | undefined>;
  create(data: ICreateInfoDTO): Promise<Info>;
  delete(id: string): Promise<string>;
  save(user: ICreateInfoDTO): Promise<Info>;
}
