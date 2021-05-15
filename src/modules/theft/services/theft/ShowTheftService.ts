import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import Theft from '@modules/theft/infra/typeorm/entities/Theft';
import ITheftRepository from '../../repositories/ITheftRepository';

interface IRequest {
  theft_id: string;
}

@injectable()
export default class ShowTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({ theft_id }: IRequest): Promise<Theft> {
    const checkTheftExists = await this.theftRepository.findById(
      theft_id,
    );

    if (!checkTheftExists) {
      throw new AppError('Theft not found.', 404);
    }

    return checkTheftExists;
  }
}
