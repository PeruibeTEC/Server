import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  business_rating_id: string;
}

@injectable()
export default class ShowBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    business_rating_id,
  }: IRequest): Promise<BusinessRating | undefined> {
    const businessRating = await this.businessRatingRepository.findById(
      business_rating_id,
    );

    if (!businessRating) {
      throw new AppError('Rating not found.', 404);
    }

    return businessRating;
  }
}
