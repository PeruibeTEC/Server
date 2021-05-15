import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftRepository from '../../repositories/ITheftRepository';

interface IRequest {
  theft_id: string;
}

@injectable()
export default class DeleteTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({ theft_id }: IRequest): Promise<void> {
    const checkTheftExists = await this.theftRepository.findById(
      theft_id,
    );

    if (!checkTheftExists) {
      throw new AppError('Theft not found.', 404);
    }

    await this.theftRepository.delete(theft_id);
  }
}
