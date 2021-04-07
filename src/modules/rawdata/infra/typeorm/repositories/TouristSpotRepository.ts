import { getRepository, Repository } from 'typeorm';

import ITouristSpotRepository from '@modules/rawdata/repositories/ITouristSpotRepository';
import ITouristSpotDTO from '@modules/rawdata/dtos/ITouristSpotDTO';

import TouristSpot from '../entities/TouristSpot';

export default class TouristSpotRepository implements ITouristSpotRepository {
  private ormRepository: Repository<TouristSpot>;

  constructor() {
    this.ormRepository = getRepository(TouristSpot);
  }

  public async findById(id: string): Promise<TouristSpot | undefined> {
    const touristSpot = await this.ormRepository.findOne(id);

    return touristSpot;
  }

  public async findByName(name: string): Promise<TouristSpot | undefined> {
    const touristSpot = await this.ormRepository.findOne({
      where: { name },
    });

    return touristSpot;
  }

  public async findAll(): Promise<TouristSpot[]> {
    const info = await this.ormRepository.find();

    return info;
  }

  public async create(infoData: ITouristSpotDTO): Promise<TouristSpot> {
    const touristSpot = this.ormRepository.create(infoData);

    await this.ormRepository.save(touristSpot);

    return touristSpot;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `touristSpot_id: ${id} deleted`;
  }

  public async save(touristSpot: TouristSpot): Promise<TouristSpot> {
    return this.ormRepository.save(touristSpot);
  }
}
