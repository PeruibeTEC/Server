import { injectable, inject } from 'tsyringe';

import ILikeDTO from '@modules/social/dtos/ILikeDTO';
import Like from '@modules/social/infra/typeorm/entities/Like';
import ILikeRepository from '../../repositories/ILikeRepository';

@injectable()
export default class IndexLikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({ post_id }: ILikeDTO): Promise<Like[] | undefined> {
    const posts = await this.likeRepository.findAllByPost(post_id);

    return posts;
  }
}
