import InterestPointType from '../infra/typeorm/entities/InterestPointType';

export default interface IInterestPointDTO {
  interest_point_type_id: InterestPointType;
  name: string;
  telephone: string;
  street: string;
  number: string;
  district: string;
}
