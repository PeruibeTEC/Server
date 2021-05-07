import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  business_rating_id: string;
}

@injectable()
export default class DeleteBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({ business_rating_id }: IRequest): Promise<void> {
    const businessRating = await this.businessRatingRepository.findById(
      business_rating_id,
    );

    if (!businessRating) {
      throw new AppError('Rating not found.', 404);
    }

    await this.businessRatingRepository.delete(business_rating_id);
  }
}
