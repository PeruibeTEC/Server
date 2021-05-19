import { injectable, inject } from 'tsyringe';

import TheftItems from '../../infra/typeorm/entities/TheftItems';
import ITheftItemsRepository from '../../repositories/ITheftItemsRepository';

interface IRequest {
  items: string;
  amount: number;
  theft_id: string;
}

@injectable()
export default class CreateTheftItemsService {
  constructor(
    @inject('TheftItemsRepository')
    private theftItemsRepository: ITheftItemsRepository,
  ) {}

  public async execute({
    items,
    amount,
    theft_id,
  }: IRequest): Promise<TheftItems> {
    const theftItems = this.theftItemsRepository.create({
      items,
      amount,
      theft_id,
    });

    return theftItems;
  }
}
