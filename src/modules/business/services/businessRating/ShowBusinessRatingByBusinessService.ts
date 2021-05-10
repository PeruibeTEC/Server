import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class ShowBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    business_id,
  }: IRequest): Promise<BusinessRating | undefined> {
    const businessRating = await this.businessRatingRepository.findByBusiness(
      business_id,
    );

    if (!businessRating) {
      throw new AppError('Business not found.', 404);
    }

    return businessRating;
  }
}
