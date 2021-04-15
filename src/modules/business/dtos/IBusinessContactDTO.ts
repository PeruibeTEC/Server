import Business from '../infra/typeorm/entities/Business';

export default interface IBusinessContactDTO {
  name: string;
  contact_email: string;
  cellphone: string;
  tellphone: string;
  business_id: Business;
}
