import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import PhotoPost from '@modules/social/infra/typeorm/entities/PhotoPost';
import IPhotoPostRepository from '../../repositories/IPhotoPostRepository';

interface IRequest {
  post_id: string;
}

@injectable()
export default class ShowPhotoPostService {
  constructor(
    @inject('PhotoPostRepository')
    private photoPostRepository: IPhotoPostRepository,
  ) {}

  public async execute({
    post_id,
  }: IRequest): Promise<PhotoPost[] | undefined> {
    const photoPost = await this.photoPostRepository.findAllByPost(post_id);

    if (!photoPost) {
      throw new AppError('Post not found.', 404);
    }

    return photoPost;
  }
}
