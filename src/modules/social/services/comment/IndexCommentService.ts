import { injectable, inject } from 'tsyringe';

import Comment from '../../infra/typeorm/entities/Comment';
import ICommentRepository from '../../repositories/ICommentRepository';

interface IRequest {
  post_id: string;
}

@injectable()
export default class IndexCommentService {
  constructor(
    @inject('CommentRepository')
    private commentRepository: ICommentRepository,
  ) {}

  public async execute({ post_id }: IRequest): Promise<Comment[] | undefined> {
    const posts = await this.commentRepository.findAllByPost(post_id);

    return posts;
  }
}
