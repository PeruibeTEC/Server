import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import averageRatingFunction from '@shared/utils/averageRatingFunction';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class IndexBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    business_id,
  }: IRequest): Promise<Business | undefined> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    const averageRating = await this.businessRatingRepository.findAllValues(
      business_id,
    );

    const finalArray = averageRating?.map(obj => {
      return obj.value;
    });

    const averageRatingValue = averageRatingFunction(finalArray);

    Object.assign(business, { averageRatingValue });
    return business;
  }
}
