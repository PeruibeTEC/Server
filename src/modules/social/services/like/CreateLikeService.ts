import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ILikeDTO from '@modules/social/dtos/ILikeDTO';
import Like from '../../infra/typeorm/entities/Like';
import ILikeRepository from '../../repositories/ILikeRepository';

@injectable()
export default class CreateLikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({ user_id, post_id }: ILikeDTO): Promise<Like> {
    if (!user_id || !post_id) {
      throw new AppError('User or Post does not exist', 404);
    }

    const like = this.likeRepository.create({
      user_id,
      post_id,
    });

    return like;
  }
}
