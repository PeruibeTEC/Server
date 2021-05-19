import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

interface IRequest {
  business_comment_id: string;
  user_id: string;
}

@injectable()
export default class DeleteBusinessCommentService {
  constructor(
    @inject('BusinessCommentRepository')
    private businessCommentRepository: IBusinessCommentRepository,
  ) {}

  public async execute({
    business_comment_id,
    user_id,
  }: IRequest): Promise<void> {
    const businessComment = await this.businessCommentRepository.findById(
      business_comment_id,
    );

    if (!businessComment) {
      throw new AppError('Comment not found.', 404);
    }

    if (businessComment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to delete this comment.',
        403,
      );
    }

    await this.businessCommentRepository.delete(business_comment_id);
  }
}
