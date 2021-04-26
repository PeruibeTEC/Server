import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IPhotoPostDTO from '@modules/social/dtos/IPhotoPostDTO';
import { azureCreate } from '@shared/infra/azure/imageStorage/imageUpload';
import PhotoPost from '../../infra/typeorm/entities/PhotoPost';
import IPhotoPostRepository from '../../repositories/IPhotoPostRepository';

@injectable()
export default class CreatePhotoPostService {
  constructor(
    @inject('PhotoPostRepository')
    private photoPostRepository: IPhotoPostRepository,
  ) {}

  public async execute({ url, post_id }: IPhotoPostDTO): Promise<PhotoPost> {
    try {
      url = azureCreate('post-images', url);
    } catch (err) {
      throw new AppError(
        'An error occurred while uploading the image, please try again later',
      );
    }

    const post = this.photoPostRepository.create({
      url,
      post_id,
    });

    return post;
  }
}
