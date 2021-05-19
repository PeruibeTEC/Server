import TheftItems from '../infra/typeorm/entities/TheftItems';
import ITheftItemsDTO from '../dtos/ITheftItemsDTO';

export default interface ITheftItemsRepository {
  findAllTheftItems(): Promise<TheftItems[] | undefined>;
  findById(id: string): Promise<TheftItems | undefined>;
  create(data: ITheftItemsDTO): Promise<TheftItems>;
  delete(id: string): Promise<string>;
  save(theft_items: ITheftItemsDTO): Promise<TheftItems>;
}
