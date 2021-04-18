import { getRepository, Repository } from 'typeorm';

import ICommentRepository from '@modules/social/repositories/ICommentRepository';
import ICommentDTO from '@modules/social/dtos/ICommentDTO';

import Comment from '../entities/Comment';

export default class CommentRepository implements ICommentRepository {
  private ormRepository: Repository<Comment>;

  constructor() {
    this.ormRepository = getRepository(Comment);
  }

  public async findAllByPost(post_id: string): Promise<Comment[]> {
    const comentsPost = await this.ormRepository.find({ where: post_id });

    return comentsPost;
  }

  public async findById(id: string): Promise<Comment | undefined> {
    const comment = await this.ormRepository.findOne(id);

    return comment;
  }

  public async create(infoData: ICommentDTO): Promise<Comment> {
    const comment = this.ormRepository.create(infoData);

    await this.ormRepository.save(comment);

    return comment;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Comment_id: ${id} deleted`;
  }

  public async save(commentPost: Comment): Promise<Comment> {
    return this.ormRepository.save(commentPost);
  }
}
