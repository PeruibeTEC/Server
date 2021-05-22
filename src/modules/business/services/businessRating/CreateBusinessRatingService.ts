import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

export interface IRequest {
  value: number;
  user_id: string;
  business_id: string;
}

@injectable()
export default class CreateBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    value,
    user_id,
    business_id,
  }: IRequest): Promise<BusinessRating> {
    if (value > 5) {
      throw new AppError('Rating is above number limit', 413);
    }

    const ratingExists = await this.businessRatingRepository.findByUserAndBusiness(
      user_id,
      business_id,
    );

    if (ratingExists) {
      throw new AppError('A User can only give one rating.', 409);
    }

    const businessRating = this.businessRatingRepository.create({
      value,
      user_id,
      business_id,
    });

    return businessRating;
  }
}
