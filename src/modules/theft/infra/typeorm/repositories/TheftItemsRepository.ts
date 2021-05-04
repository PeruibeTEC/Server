import { getRepository, Repository } from 'typeorm';

import ITheftItemsRepository from '@modules/theft/repositories/ITheftItemsRepository';
import ITheftItemsDTO from '@modules/theft/dtos/ITheftItemsDTO';
import TheftItems from '../entities/StolenItems';

export default class TheftItemsRepository implements ITheftItemsRepository {
  private ormRepository: Repository<TheftItems>;

  constructor() {
    this.ormRepository = getRepository(TheftItems);
  }

  public async findAllByTheft(theft_id: string): Promise<TheftItems[]> {
    const theft_items = await this.ormRepository.find({
      where: { theft_id },
    });

    return theft_items;
  }

  public async findById(id: string): Promise<TheftItems | undefined> {
    const theft_items = await this.ormRepository.findOne(id);

    return theft_items;
  }

  public async create(theftData: ITheftItemsDTO): Promise<TheftItems> {
    const theft_items = this.ormRepository.create(theftData);

    await this.ormRepository.save(theft_items);

    return theft_items;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Theft_item_id: ${id} deleted`;
  }

  public async save(theftData: TheftItems): Promise<TheftItems> {
    return this.ormRepository.save(theftData);
  }
}
