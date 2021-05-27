import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftRepository from '../../repositories/ITheftRepository';
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

    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({
    items,
    amount,
    theft_id,
  }: IRequest): Promise<TheftItems> {
    const checkTheftExists = await this.theftRepository.findById(theft_id);

    if (!checkTheftExists) {
      throw new AppError('Theft not found.', 404);
    }

    const theftItems = this.theftItemsRepository.create({
      items,
      amount,
      theft_id,
    });

    return theftItems;
  }
}
