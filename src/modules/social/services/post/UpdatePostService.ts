import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import User from '@modules/user/infra/typeorm/entities/User';
import Post from '../../infra/typeorm/entities/Post';
import IPostRepository from '../../repositories/IPostRepository';

interface IRequest {
  post_id: string;
  user_id: User;
  content: string;
}

@injectable()
export default class UpdateInterestPointService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({ post_id, user_id, content }: IRequest): Promise<Post> {
    // TODO: check the number of characters
    const post = await this.postRepository.findById(post_id);

    if (!post) {
      throw new AppError('Post not found.', 404);
    }
    console.log(post.user_id);

    if (post.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to updated this post',
        401,
      );
    }

    Object.assign(post, { content });

    return this.postRepository.save(post);
  }
}
