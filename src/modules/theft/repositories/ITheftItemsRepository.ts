import TheftItems from '../infra/typeorm/entities/StolenItems';
import ITheftItemsDTO from '../dtos/ITheftItemsDTO';

export default interface ITheftItemsRepository {
  findAllByTheft(
    theft_id: string,
  ): Promise<TheftItems[] | undefined>;
  findById(id: string): Promise<TheftItems | undefined>;
  create(data: ITheftItemsDTO): Promise<TheftItems>;
  delete(id: string): Promise<string>;
  save(theft_items: ITheftItemsDTO): Promise<TheftItems>;
}
