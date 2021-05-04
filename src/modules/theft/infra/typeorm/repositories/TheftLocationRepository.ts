import { getRepository, Repository } from 'typeorm';

import ITheftLocationRepository from '@modules/theft/repositories/ITheftLocationRepository';
import ITheftLocationDTO from '@modules/theft/dtos/ITheftLocationDTO';
import TheftLocation from '../entities/TheftLocation';

export default class TheftLocationRepository implements ITheftLocationRepository {
  private ormRepository: Repository<TheftLocation>;

  constructor() {
    this.ormRepository = getRepository(TheftLocation);
  }

  public async findByDistrict(district: string): Promise<TheftLocation[] | undefined> {
    const theft_location = await this.ormRepository.find({
      where: { district },
    })

    return theft_location;
  }

  public async findById(id: string): Promise<TheftLocation | undefined> {
    const theft_location = await this.ormRepository.findOne(id);

    return theft_location;
  }

  public async create(theftData: ITheftLocationDTO): Promise<TheftLocation> {
    const theft_location = this.ormRepository.create(theftData);

    await this.ormRepository.save(theft_location);

    return theft_location;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Theft_location_id: ${id} deleted`;
  }

  public async save(theftData: TheftLocation): Promise<TheftLocation> {
    return this.ormRepository.save(theftData);
  }
}
