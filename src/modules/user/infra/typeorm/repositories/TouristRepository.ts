import { getRepository, Repository } from 'typeorm';

import ITouristDTO from '@modules/user/dtos/ITouristDTO';
import ITouristRepository from '@modules/user/repositories/ITouristRepository';
import Tourist from '../entities/Tourist';

export default class TouristRepository implements ITouristRepository {
  private ormRepository: Repository<Tourist>;

  constructor() {
    this.ormRepository = getRepository(Tourist);
  }

  public async findById(id: string): Promise<Tourist | undefined> {
    const tourist = await this.ormRepository.findOne(id);

    return tourist;
  }

  public async findAllTourists(expect_tourist_id?: string): Promise<Tourist[]> {
    const tourists = await this.ormRepository.find();

    return tourists;
  }

  public async create(TouristData: ITouristDTO): Promise<Tourist> {
    const tourist = this.ormRepository.create(TouristData);

    await this.ormRepository.save(tourist);

    return tourist;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Tourist_id: ${id} deleted`;
  }

  public async save(tourist: Tourist): Promise<Tourist> {
    return this.ormRepository.save(tourist);
  }
}
