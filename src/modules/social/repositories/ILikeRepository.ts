import Like from '../infra/typeorm/entities/Like';
import ILikeDTO from '../dtos/ILikeDTO';

export default interface ILikeRepository {
  findAllByPost(post_id: string): Promise<Like[] | undefined>;
  create(data: ILikeDTO): Promise<Like>;
  delete(id: string): Promise<string>;
  save(interest_point: Like): Promise<Like>;
}
