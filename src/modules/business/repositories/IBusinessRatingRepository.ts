import BusinessRating from '../infra/typeorm/entities/BusinessRating';
import IBusinessRatingDTO from '../dtos/IBusinessRatingDTO';

export default interface IBusinessRatingRepository {
  findAllValues(business_id: string): Promise<BusinessRating[] | undefined>;
  findById(id: string): Promise<BusinessRating | undefined>;
  findByUser(user_id: string): Promise<BusinessRating | undefined>;
  findByBusiness(business_id: string): Promise<BusinessRating | undefined>;
  create(data: IBusinessRatingDTO): Promise<BusinessRating>;
  delete(id: string): Promise<string>;
  save(business_rating: BusinessRating): Promise<BusinessRating>;
}
