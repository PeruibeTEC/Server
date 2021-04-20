import { injectable, inject } from 'tsyringe';

import Post from '../../infra/typeorm/entities/Post';
import IPostRepository from '../../repositories/IPostRepository';

@injectable()
export default class IndexPostService {
  constructor(
    @inject('PostRepository')
    private postRepository: IPostRepository,
  ) {}

  public async execute(): Promise<Post[]> {
    const posts = await this.postRepository.findAllPost();

    return posts;
  }
}
