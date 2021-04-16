import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import User from '@modules/user/infra/typeorm/entities/User';
import IPostRepository from '../../repositories/IPostRepository';

interface IRequest {
  post_id: string;
  user_id: User;
}

@injectable()
export default class DeletePostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ post_id, user_id }: IRequest): Promise<void> {
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not found.', 404);
    }

    if (post.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to delete this post',
        401,
      );
    }

    await this.postRepository.delete(post_id);
  }
}
