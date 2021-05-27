import { getRepository, Repository } from 'typeorm';

import IBusinessCommentRepository from '@modules/business/repositories/IBusinessCommentRepository';
import IBusinessCommentDTO from '@modules/business/dtos/IBusinessCommentDTO';

import BusinessComment from '../entities/BusinessComment';

export default class BusinessCommentRepository
  implements IBusinessCommentRepository {
  private ormRepository: Repository<BusinessComment>;

  constructor() {
    this.ormRepository = getRepository(BusinessComment);
  }

  public async findById(id: string): Promise<BusinessComment | undefined> {
    const businessComment = await this.ormRepository.findOne({
      where: { id },
    });

    return businessComment;
  }

  public async findByUser(
    user_id: string,
  ): Promise<BusinessComment | undefined> {
    const businessComment = await this.ormRepository.findOne({
      where: { user_id },
    });

    return businessComment;
  }

  public async findByBusiness(
    business_id: string,
  ): Promise<BusinessComment | undefined> {
    const businessComment = await this.ormRepository.findOne({
      where: { business_id },
    });

    return businessComment;
  }

  public async findAllByBusiness(
    business_id: string,
  ): Promise<BusinessComment[] | undefined> {
    const businessComment = await this.ormRepository.find({
      where: { business_id },
    });

    return businessComment;
  }

  public async create(
    businessCommentData: IBusinessCommentDTO,
  ): Promise<BusinessComment> {
    const businessComment = this.ormRepository.create(businessCommentData);

    await this.ormRepository.save(businessComment);

    return businessComment;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `BusinessComment_id: ${id} deleted`;
  }

  public async save(
    businessComment: BusinessComment,
  ): Promise<BusinessComment> {
    return this.ormRepository.save(businessComment);
  }
}
