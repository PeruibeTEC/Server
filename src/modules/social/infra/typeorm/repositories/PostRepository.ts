import { getRepository, Repository } from 'typeorm';

import IPostRepository from '@modules/social/repositories/IPostRepository';
import IPostDTO from '@modules/social/dtos/IPostDTO';

import Post from '../entities/Post';

export default class PostRepository implements IPostRepository {
  private ormRepository: Repository<Post>;

  constructor() {
    this.ormRepository = getRepository(Post);
  }

  public async findById(id: string): Promise<Post | undefined> {
    const post = await this.ormRepository.findOne(id);

    return post;
  }

  public async findAllPost(): Promise<Post[]> {
    const posts = await this.ormRepository.find();

    return posts;
  }

  public async create(infoData: IPostDTO): Promise<Post> {
    const post = this.ormRepository.create(infoData);

    await this.ormRepository.save(post);

    return post;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Post_id: ${id} deleted`;
  }

  public async save(post: Post): Promise<Post> {
    return this.ormRepository.save(post);
  }
}
