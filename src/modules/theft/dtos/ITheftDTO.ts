export default interface ITheftDTO {
  date: Date;
  time?: Date;
  description?: string;
  theft_location_id: string;
  user_id: string;
}
