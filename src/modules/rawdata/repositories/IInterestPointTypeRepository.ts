import InterestPointType from '../infra/typeorm/entities/InterestPointType';
import IInterestPointTypeDTO from '../dtos/IInterestPointTypeDTO';

export default interface IInterestPointTypeRepository {
  findAllInterestPointType(
    expect_interest_point_type_id?: string,
  ): Promise<InterestPointType[]>;
  findById(id: string): Promise<InterestPointType | undefined>;
  findByName(name: string): Promise<InterestPointType | undefined>;
  create(data: IInterestPointTypeDTO): Promise<InterestPointType>;
  delete(id: string): Promise<string>;
  save(interest_point_type: IInterestPointTypeDTO): Promise<InterestPointType>;
}
