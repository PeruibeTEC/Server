export default interface IProjectDTO {
  name: string;
  street?: string;
  district?: string;
  latitude: number;
  longitude: number;
  starting_date: Date;
  ending_date: Date;
  price: number;
}
