import { getRepository, Repository } from 'typeorm';

import IBusinessRatingRepository from '@modules/business/repositories/IBusinessRatingRepository';
import IBusinessRatingDTO from '@modules/business/dtos/IBusinessRatingDTO';

import BusinessRating from '../entities/BusinessRating';

export default class BusinessRatingRepository
  implements IBusinessRatingRepository {
  private ormRepository: Repository<BusinessRating>;

  constructor() {
    this.ormRepository = getRepository(BusinessRating);
  }

  public async findById(id: string): Promise<BusinessRating | undefined> {
    const businessRating = await this.ormRepository.findOne(id);

    return businessRating;
  }

  public async findByUser(
    user_id: string,
  ): Promise<BusinessRating | undefined> {
    const businessRating = await this.ormRepository.findOne({
      where: { user_id },
    });

    return businessRating;
  }

  public async findByUserAndBusiness(
    user_id: string,
    business_id: string,
  ): Promise<BusinessRating | undefined> {
    const businessRating = await this.ormRepository.findOne({
      where: [{ user_id }, { business_id }],
    });

    return businessRating;
  }

  public async findAllValues(
    business_id: string,
  ): Promise<BusinessRating[] | undefined> {
    const businessRating = await this.ormRepository.find({
      select: ['value'],
      where: { business_id },
    });

    return businessRating;
  }

  public async create(
    businessRatingData: IBusinessRatingDTO,
  ): Promise<BusinessRating> {
    const businessRating = this.ormRepository.create(businessRatingData);

    await this.ormRepository.save(businessRating);

    return businessRating;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `BusinessRating_id: ${id} deleted`;
  }

  public async save(businessRating: BusinessRating): Promise<BusinessRating> {
    return this.ormRepository.save(businessRating);
  }
}
