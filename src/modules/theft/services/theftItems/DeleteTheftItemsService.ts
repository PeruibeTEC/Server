import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftItemsRepository from '../../repositories/ITheftItemsRepository';

interface IRequest {
  theft_items_id: string;
}

@injectable()
export default class DeleteTheftItemsService {
  constructor(
    @inject('TheftItemsRepository')
    private theftItemsRepository: ITheftItemsRepository,
  ) {}

  public async execute({ theft_items_id }: IRequest): Promise<void> {
    const checkTheftItemsExists = await this.theftItemsRepository.findById(
      theft_items_id,
    );

    if (!checkTheftItemsExists) {
      throw new AppError('Items not found.', 404);
    }

    await this.theftItemsRepository.delete(theft_items_id);
  }
}
