import BusinessComment from '../infra/typeorm/entities/BusinessComment';
import IBusinessCommentDTO from '../dtos/IBusinessCommentDTO';

export default interface IBusinessCommentRepository {
  findAllByBusiness(
    business_id: string,
  ): Promise<BusinessComment[] | undefined>;
  findById(id: string): Promise<BusinessComment | undefined>;
  findByUser(user_id: string): Promise<BusinessComment | undefined>;
  findByBusiness(business_id: string): Promise<BusinessComment | undefined>;
  create(data: IBusinessCommentDTO): Promise<BusinessComment>;
  delete(id: string): Promise<string>;
  save(business_comment: BusinessComment): Promise<BusinessComment>;
}
