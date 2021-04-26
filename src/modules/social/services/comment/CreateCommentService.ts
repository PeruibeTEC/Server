import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ICommentDTO from '@modules/social/dtos/ICommentDTO';
import Comment from '../../infra/typeorm/entities/Comment';
import ICommentRepository from '../../repositories/ICommentRepository';

@injectable()
export default class CreateCommentService {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute({
    content,
    user_id,
    post_id,
  }: ICommentDTO): Promise<Comment> {
    if (content.length > 160) {
      throw new AppError('Content has exceeded the character limit', 413);
    }

    const comment = this.commentRepository.create({
      content,
      user_id,
      post_id,
    });

    return comment;
  }
}
