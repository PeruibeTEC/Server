import Theft from '../infra/typeorm/entities/Theft';

export default interface ITheftItemsDTO {
  items: string;
  amount: number;
  theft_id: Theft;
}
