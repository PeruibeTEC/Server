import InterestPoint from '../infra/typeorm/entities/InterestPoint';
import IInterestPointDTO from '../dtos/IInterestPointDTO';

export default interface IInterestPointRepository {
  findAllInterestPoint(): Promise<InterestPoint[]>;
  findById(id: string): Promise<InterestPoint | undefined>;
  findByName(name: string): Promise<InterestPoint | undefined>;
  create(data: IInterestPointDTO): Promise<InterestPoint>;
  delete(id: string): Promise<string>;
  save(interest_point: InterestPoint): Promise<InterestPoint>;
}
