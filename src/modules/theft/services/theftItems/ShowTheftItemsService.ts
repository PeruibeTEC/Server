import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import TheftItems from '@modules/theft/infra/typeorm/entities/TheftItems';
import ITheftItemsRepository from '../../repositories/ITheftItemsRepository';

interface IRequest {
  theft_items_id: string;
}

@injectable()
export default class ShowTheftItemsService {
  constructor(
    @inject('TheftItemsRepository')
    private theftItemsRepository: ITheftItemsRepository,
  ) {}

  public async execute({ theft_items_id }: IRequest): Promise<TheftItems> {
    const checkTheftItemsExists = await this.theftItemsRepository.findById(
      theft_items_id,
    );

    if (!checkTheftItemsExists) {
      throw new AppError('Items not found.', 404);
    }

    return checkTheftItemsExists;
  }
}
