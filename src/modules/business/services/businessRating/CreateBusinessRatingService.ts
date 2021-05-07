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
    const checkRatingSize = value;

    if (checkRatingSize > 5) {
      throw new AppError('Rating is above number limit', 413);
    }

    const businessRating = this.businessRatingRepository.create({
      value,
      user_id,
      business_id,
    });

    return businessRating;
  }
}
