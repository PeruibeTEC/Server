import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessComment from '../../infra/typeorm/entities/BusinessComment';
import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

export interface IRequest {
  content: string;
  business_comment_id: string;
}

@injectable()
export default class UpdateBusinessCommentService {
  constructor(
    @inject('BusinessCommentRepository')
    private businessCommentRepository: IBusinessCommentRepository,
  ) {}

  public async execute({
    content,
    business_comment_id,
  }: IRequest): Promise<BusinessComment> {
    const businessComment = await this.businessCommentRepository.findById(
      business_comment_id,
    );

    if (!businessComment) {
      throw new AppError('Comment  not found.', 404);
    }

    Object.assign(businessComment, { content });

    return this.businessCommentRepository.save(businessComment);
  }
}
