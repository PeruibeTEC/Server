import ITouristDTO from '../dtos/ITouristDTO';
import Tourist from '../infra/typeorm/entities/Tourist';

export default interface ITouristRepository {
  findAllTourists(expect_tourist_id?: string): Promise<Tourist[]>;
  findById(id: string): Promise<Tourist | undefined>;
  create(data: ITouristDTO): Promise<Tourist>;
  delete(id: string): Promise<string>;
  save(tourist: Tourist): Promise<Tourist>;
}
