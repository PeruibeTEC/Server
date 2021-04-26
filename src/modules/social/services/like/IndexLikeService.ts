import { injectable, inject } from 'tsyringe';

import Like from '@modules/social/infra/typeorm/entities/Like';
import ILikeRepository from '../../repositories/ILikeRepository';

interface IRequest {
  post_id: string;
}

@injectable()
export default class IndexLikeService {
  constructor(
    @inject('LikeRepository')
    private likeRepository: ILikeRepository,
  ) {}

  public async execute({ post_id }: IRequest): Promise<Like[] | undefined> {
    const posts = await this.likeRepository.findAllByPost(post_id);

    return posts;
  }
}
