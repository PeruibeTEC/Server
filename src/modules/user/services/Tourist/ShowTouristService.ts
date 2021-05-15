import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import Tourist from '@modules/user/infra/typeorm/entities/Tourist';
import ITouristRepository from '../../repositories/ITouristRepository';

interface IRequest {
  tourist_id: string;
}

@injectable()
export default class ShowTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,
  ) {}

  public async execute({ tourist_id }: IRequest): Promise<Tourist> {
    const checkTouristExists = await this.touristRepository.findById(
      tourist_id,
    );

    if (!checkTouristExists) {
      throw new AppError('Tourist not found.', 404);
    }

    return checkTouristExists;
  }
}
