import Business from '../infra/typeorm/entities/Business';

export default interface IBusinessContactDTO {
  contact_email: string;
  cellphone: string;
  tellphone: string;
  business_id: Business;
}
