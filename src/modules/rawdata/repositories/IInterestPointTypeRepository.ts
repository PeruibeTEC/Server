import InterestPointType from '../infra/typeorm/entities/InterestPointType';
import ICreateInterestPointTypeDTO from '../dtos/ICreateInterestPointTypeDTO';

export default interface IInterestPointTypeRepository {
  findAllInterestPointType(
    expect_interest_point_type_id?: string,
  ): Promise<InterestPointType[]>;
  findById(id: string): Promise<InterestPointType | undefined>;
  findByName(name: string): Promise<InterestPointType | undefined>;
  create(data: ICreateInterestPointTypeDTO): Promise<InterestPointType>;
  delete(id: string): Promise<string>;
  save(
    interest_point_type: ICreateInterestPointTypeDTO,
  ): Promise<InterestPointType>;
}
