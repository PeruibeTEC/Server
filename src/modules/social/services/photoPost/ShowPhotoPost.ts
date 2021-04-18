import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import PhotoPost from '@modules/social/infra/typeorm/entities/PhotoPost';
import IPhotoPostRepository from '../../repositories/IPhotoPostRepository';

interface IRequest {
  photo_post_id: string;
}

@injectable()
export default class DeletePhotoPostService {
  constructor(
    @inject('PhotoPostRepository')
    private photoPostRepository: IPhotoPostRepository,
  ) {}

  public async execute({
    photo_post_id,
  }: IRequest): Promise<PhotoPost[] | undefined> {
    const photoPost = await this.photoPostRepository.findAllByPost(
      photo_post_id,
    );

    if (!photoPost) {
      throw new AppError('Post not found.', 404);
    }

    return photoPost;
  }
}
