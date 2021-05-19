import { injectable, inject } from 'tsyringe';

import TheftItems from '@modules/theft/infra/typeorm/entities/TheftItems';
import ITheftItemsRepository from '../../repositories/ITheftItemsRepository';

@injectable()
export default class IndexTheftItemsService {
  constructor(
    @inject('TheftItemsRepository')
    private theftItemsRepository: ITheftItemsRepository,
  ) {}

  public async execute(): Promise<TheftItems[] | undefined> {
    const theftItems = await this.theftItemsRepository.findAllTheftItems();

    return theftItems;
  }
}
