export default interface IEventBusinessDTO {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  background_photo?: string;
  description: string;
  business_id: string;
  event_type_business_id: string;
}
