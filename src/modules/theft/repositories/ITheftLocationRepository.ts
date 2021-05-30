import TheftLocation from '../infra/typeorm/entities/TheftLocation';
import ITheftLocationDTO from '../dtos/ITheftLocationDTO';

export default interface ITheftLocationRepository {
  findAllTheftLocation(): Promise<TheftLocation[] | undefined>;
  findByDistrict(district: string): Promise<TheftLocation[] | undefined>;
  findById(id: string): Promise<TheftLocation | undefined>;
  create(data: ITheftLocationDTO): Promise<TheftLocation>;
  delete(id: string): Promise<string>;
  save(theft_location: ITheftLocationDTO): Promise<TheftLocation>;
}
