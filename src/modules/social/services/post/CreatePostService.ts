import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IPostDTO from '@modules/social/dtos/IPostDTO';
import Post from '../../infra/typeorm/entities/Post';
import IPostRepository from '../../repositories/IPostRepository';

@injectable()
export default class CreatePostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute({
    content,
    has_photo,
    user_id,
  }: IPostDTO): Promise<Post> {
    if (content.length > 200) {
      throw new AppError('Content has exceeded the character limit', 413);
    }

    const post = this.postRepository.create({
      content,
      has_photo,
      user_id,
    });

    return post;
  }
}
