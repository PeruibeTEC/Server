import InterestPoint from '../infra/typeorm/entities/InterestPoint';
import ICreateInterestPointDTO from '../dtos/ICreateInterestPointDTO';

export default interface IInterestPointRepository {
  findAllInterestPoint(
    expect_interest_point_id?: string,
  ): Promise<InterestPoint[]>;
  findById(id: string): Promise<InterestPoint | undefined>;
  findByName(name: string): Promise<InterestPoint | undefined>;
  create(data: ICreateInterestPointDTO): Promise<InterestPoint>;
  delete(id: string): Promise<string>;
  save(interest_point: InterestPoint): Promise<InterestPoint>;
}
