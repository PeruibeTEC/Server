import { getRepository, Repository } from 'typeorm';

import IPhotoPostRepository from '@modules/social/repositories/IPhotoPostRepository';
import IPhotoPostDTO from '@modules/social/dtos/IPhotoPostDTO';

import PhotoPost from '../entities/PhotoPost';

export default class PhotoPostRepository implements IPhotoPostRepository {
  private ormRepository: Repository<PhotoPost>;

  constructor() {
    this.ormRepository = getRepository(PhotoPost);
  }

  public async findById(id: string): Promise<PhotoPost | undefined> {
    const photoPost = await this.ormRepository.findOne(id);

    return photoPost;
  }

  public async findAllByPost(
    post_id: string,
  ): Promise<PhotoPost[] | undefined> {
    const photosPost = await this.ormRepository.find({
      where: { post_id },
    });

    return photosPost;
  }

  public async create(infoData: IPhotoPostDTO): Promise<PhotoPost> {
    const photoPost = this.ormRepository.create(infoData);

    await this.ormRepository.save(photoPost);
 
    return photoPost;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `PhotoPost_id: ${id} deleted`;
  }

  public async save(photoPost: PhotoPost): Promise<PhotoPost> {
    return this.ormRepository.save(photoPost);
  }
}
