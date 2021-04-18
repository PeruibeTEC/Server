import PhotoPost from '../infra/typeorm/entities/PhotoPost';
import IPhotoPostDTO from '../dtos/IPhotoPostDTO';

export default interface IPhotoPostRepository {
  findAllByPost(post_id: string): Promise<PhotoPost[] | undefined>;
  findById(id: string): Promise<PhotoPost | undefined>;
  create(data: IPhotoPostDTO): Promise<PhotoPost>;
  delete(id: string): Promise<string>;
  save(interest_point: PhotoPost): Promise<PhotoPost>;
}
