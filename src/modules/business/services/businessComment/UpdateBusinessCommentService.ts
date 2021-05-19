import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessComment from '../../infra/typeorm/entities/BusinessComment';
import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

export interface IRequest {
  content: string;
  business_comment_id: string;
  user_id: string;
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
    user_id,
  }: IRequest): Promise<BusinessComment> {
    const businessComment = await this.businessCommentRepository.findById(
      business_comment_id,
    );

    if (!businessComment) {
      throw new AppError('Comment not found.', 404);
    }

    if (businessComment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to update this comment.',
        403,
      );
    }

    Object.assign(businessComment, { content });

    return this.businessCommentRepository.save(businessComment);
  }
}
