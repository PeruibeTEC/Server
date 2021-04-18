import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IPostRepository from '@modules/social/repositories/IPostRepository';
import Comment from '../../infra/typeorm/entities/Comment';
import ICommentRepository from '../../repositories/ICommentRepository';

interface IRequest {
  post_id: string;
  content: string;
  comment_id: string;
  user_id: string;
}

@injectable()
export default class UpdateCommentService {
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
    content,
  }: IRequest): Promise<Comment> {
    const post = await this.postRepository.findById(post_id);
    const comment = await this.commentRepository.findById(comment_id);

    if (!post || !comment) {
      throw new AppError('Post or Comment not found.', 404);
    }

    if (comment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to updated this comment',
        401,
      );
    }

    Object.assign(comment, { content });

    return this.commentRepository.save(comment);
  }
}
