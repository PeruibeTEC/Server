import { injectable, inject } from 'tsyringe';

import BusinessComment from '../../infra/typeorm/entities/BusinessComment';
import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

export interface IRequest {
  content: string;
  user_id: string;
  business_id: string;
}

@injectable()
export default class CreateBusinessCommentService {
  constructor(
    @inject('BusinessCommentRepository')
    private businessCommentRepository: IBusinessCommentRepository,
  ) {}

  public async execute({
    content,
    user_id,
    business_id,
  }: IRequest): Promise<BusinessComment> {
    const businessComment = this.businessCommentRepository.create({
      content,
      user_id,
      business_id,
    });

    return businessComment;
  }
}
