import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ILikeRepository from '../../repositories/ILikeRepository';

interface IRequest {
  user_id: string;
  post_id: string;
  like_id: string;
}

@injectable()
export default class DeleteLikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({ user_id, post_id, like_id }: IRequest): Promise<void> {
    if (!user_id || !post_id) {
      throw new AppError('User or Post does not exist', 404);
    }

    await this.likeRepository.delete(like_id);
  }
}
