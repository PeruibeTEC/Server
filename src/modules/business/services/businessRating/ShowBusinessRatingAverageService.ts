import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import averageRatingFunction from '@shared/utils/averageRatingFunction';

// import BusinessRating from '../../infra/typeorm/entities/BusinessRating';
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

  public async execute({ business_id }: IRequest): Promise<string | undefined> {
    const businessRating = await this.businessRatingRepository.findByBusiness(
      business_id,
    );

    if (!businessRating) {
      throw new AppError('Business not found.', 404);
    }

    const averageRating = await this.businessRatingRepository.findAllValues(
      business_id,
    );

    const finalArray = averageRating?.map(obj => {
      return obj.value;
    });

    const averageRatingValue = averageRatingFunction(finalArray);

    return averageRatingValue;
  }
}
