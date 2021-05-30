import { getRepository, Repository } from 'typeorm';

import ITheftRepository from '@modules/theft/repositories/ITheftRepository';
import ITheftDTO from '@modules/theft/dtos/ITheftDTO';
import Theft from '../entities/Theft';

export default class TheftRepository implements ITheftRepository {
  private ormRepository: Repository<Theft>;

  constructor() {
    this.ormRepository = getRepository(Theft);
  }

  public async findAllTheftByUser(
    user_id: string,
  ): Promise<Theft[] | undefined> {
    const theft = await this.ormRepository.find({
      where: { user_id },
    });

    return theft;
  }

  public async findAllTheft(): Promise<Theft[]> {
    const theft = await this.ormRepository.find();

    return theft;
  }

  public async findById(id: string): Promise<Theft | undefined> {
    const theft = await this.ormRepository.findOne(id);

    return theft;
  }

  public async findByTitle(title: string): Promise<Theft | undefined> {
    const theft = await this.ormRepository.findOne({ title });

    return theft;
  }

  public async create(theftData: ITheftDTO): Promise<Theft> {
    const theft = this.ormRepository.create(theftData);

    await this.ormRepository.save(theft);

    return theft;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Theft_id: ${id} deleted`;
  }

  public async save(theftData: Theft): Promise<Theft> {
    return this.ormRepository.save(theftData);
  }
}
