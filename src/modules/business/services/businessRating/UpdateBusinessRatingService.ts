import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

export interface IRequest {
  value: number;
  business_rating_id: string;
  user_id: string;
}

@injectable()
export default class UpdateBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    business_rating_id,
    value,
    user_id,
  }: IRequest): Promise<BusinessRating> {
    const businessRating = await this.businessRatingRepository.findById(
      business_rating_id,
    );

    if (!businessRating) {
      throw new AppError('Rating not found.', 404);
    }

    const checkRatingSize = value;

    if (checkRatingSize > 5) {
      throw new AppError('Rating is above number limit', 413);
    }

    if (businessRating.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to update this rating.',
        403,
      );
    }

    Object.assign(businessRating, { value });

    return this.businessRatingRepository.save(businessRating);
  }
}
