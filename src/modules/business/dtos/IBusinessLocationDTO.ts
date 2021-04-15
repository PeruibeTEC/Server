import Business from '../infra/typeorm/entities/Business';

export default interface IBusinessLocationDTO {
  street: string;
  number: string;
  district: string;
  latitude: number;
  longitude: number;
  description: string;
  business_id: Business;
}
