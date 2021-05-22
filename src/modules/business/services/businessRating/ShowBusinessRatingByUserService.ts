import { injectable, inject } from 'tsyringe';

import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  user_id: string;
  business_id: string;
}

@injectable()
export default class ShowBusinessRatingService {
  constructor(
    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    user_id,
    business_id,
  }: IRequest): Promise<BusinessRating | undefined> {
    const businessRating = await this.businessRatingRepository.findByUserAndBusiness(
      user_id,
      business_id,
    );

    return businessRating;
  }
}
