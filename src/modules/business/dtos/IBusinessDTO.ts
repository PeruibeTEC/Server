export default interface IBusinessDTO {
  name: string;
  email_login: string;
  password: string;
  description?: string;
  profile_photo?: string;
  background_photo?: string;
  operating_time: Date;
  closing_time: Date;
  closing_day: string;
  business_type_id: string;
}
