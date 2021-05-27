import Theft from '../infra/typeorm/entities/Theft';
import ITheftDTO from '../dtos/ITheftDTO';

export default interface ITheftRepository {
  findAllTheftByUser(user_id: string): Promise<Theft[] | undefined>;
  findAllTheft(): Promise<Theft[]>;
  findById(id: string): Promise<Theft | undefined>;
  findByTitle(title: string): Promise<Theft | undefined>;
  create(data: ITheftDTO): Promise<Theft>;
  delete(id: string): Promise<string>;
  save(theft: Theft): Promise<Theft>;
}
