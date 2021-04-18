import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import User from '@modules/user/infra/typeorm/entities/User';
import IPostRepository from '@modules/social/repositories/IPostRepository';
import ICommentRepository from '../../repositories/ICommentRepository';

interface IRequest {
  post_id: string;
  comment_id: string;
  user_id: User;
}

@injectable()
export default class DeleteCommentService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,

    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute({
    post_id,
    user_id,
    comment_id,
  }: IRequest): Promise<void> {
    const post = await this.postRepository.findById(post_id);
    const comment = await this.commentRepository.findById(comment_id);

    if (!post || !comment) {
      throw new AppError('Post or Comment not found.', 404);
    }

    if (comment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to delete this comment',
        401,
      );
    }

    await this.commentRepository.delete(comment_id);
  }
}
