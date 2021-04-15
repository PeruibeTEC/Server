import Business from '../infra/typeorm/entities/Business';

export default interface IBusinessProductDTO {
  name: string;
  description: string;
  price: number;
  url: string;
  business_id: Business;
}
