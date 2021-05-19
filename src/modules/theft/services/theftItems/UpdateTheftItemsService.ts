import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftItemsRepository from '@modules/theft/repositories/ITheftItemsRepository';
import TheftItems from '@modules/theft/infra/typeorm/entities/TheftItems';

interface IRequest {
  theft_id: string;
  amount: number;
  items: string;
  theft_items_id: string;
}

@injectable()
export default class UpdateTheftItemsService {
  constructor(
    @inject('TheftItemsRepository')
    private theftItemsRepository: ITheftItemsRepository,
  ) {}

  public async execute({
    theft_id,
    amount,
    items,
    theft_items_id,
  }: IRequest): Promise<TheftItems> {
    const theftItems = await this.theftItemsRepository.findById(theft_items_id);

    if (!theftItems) {
      throw new AppError('Items not found.', 404);
    }

    Object.assign(theftItems, {
      theft_id,
      amount,
      items,
    });

    return this.theftItemsRepository.save(theftItems);
  }
}
