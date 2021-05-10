import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<BusinessRating | undefined> {
    const businessRating = await this.businessRatingRepository.findByUser(
      user_id,
    );

    if (!businessRating) {
      throw new AppError('User not found.', 404);
    }

    return businessRating;
  }
}
