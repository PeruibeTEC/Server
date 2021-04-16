import { getRepository, Repository } from 'typeorm';

import ILikeRepository from '@modules/social/repositories/ILikeRepository';
import ILikeDTO from '@modules/social/dtos/ILikeDTO';

import Like from '../entities/Like';

export default class LikeRepository implements ILikeRepository {
  private ormRepository: Repository<Like>;

  constructor() {
    this.ormRepository = getRepository(Like);
  }

  public async findById(id: string): Promise<Like | undefined> {
    const like = await this.ormRepository.findOne(id);

    return like;
  }

  public async findAllByPost(): Promise<Like[]> {
    const likesPost = await this.ormRepository.find();

    return likesPost;
  }

  public async create(infoData: ILikeDTO): Promise<Like> {
    const like = this.ormRepository.create(infoData);

    await this.ormRepository.save(like);

    return like;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Like_id: ${id} deleted`;
  }

  public async save(likePost: Like): Promise<Like> {
    return this.ormRepository.save(likePost);
  }
}
