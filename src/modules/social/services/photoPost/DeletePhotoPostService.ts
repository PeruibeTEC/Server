import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import { deleteImage } from '@shared/infra/azure/imageStorage/imageDelete';
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

  public async execute({ photo_post_id }: IRequest): Promise<void> {
    const photoPost = await this.photoPostRepository.findById(photo_post_id);

    if (!photoPost) {
      throw new AppError('Tourist Spot Photo not found.', 404);
    }

    deleteImage('tourist-spot-images', photoPost.url);

    await this.photoPostRepository.delete(photo_post_id);
  }
}
