import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ILikeDTO from '@modules/social/dtos/ILikeDTO';
import ILikeRepository from '../../repositories/ILikeRepository';

@injectable()
export default class DeleteLikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({ user_id, post_id }: ILikeDTO): Promise<void> {
    if (!user_id || !post_id) {
      throw new AppError('User or Post does not exist', 404);
    }

    await this.likeRepository.delete(post_id);
  }
}
