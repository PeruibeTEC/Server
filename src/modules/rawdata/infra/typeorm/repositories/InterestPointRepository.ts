import { getRepository, Repository } from 'typeorm';

import IInterestPointRepository from '@modules/rawdata/repositories/IInterestPointRepository';
import ICreateInterestPointDTO from '@modules/rawdata/dtos/ICreateInterestPointDTO';

import InterestPoint from '../entities/InterestPoint';

export default class InterestPointRepository
  implements IInterestPointRepository {
  private ormRepository: Repository<InterestPoint>;

  constructor() {
    this.ormRepository = getRepository(InterestPoint);
  }

  public async findById(id: string): Promise<InterestPoint | undefined> {
    const info = await this.ormRepository.findOne(id);

    return info;
  }

  public async findByName(name: string): Promise<InterestPoint | undefined> {
    const info = await this.ormRepository.findOne({ name });

    return info;
  }

  public async findAllInterestPoint(): Promise<InterestPoint[]> {
    let info: InterestPoint[];

    // eslint-disable-next-line prefer-const
    info = await this.ormRepository.find();

    return info;
  }

  public async create(
    interestPointData: ICreateInterestPointDTO,
  ): Promise<InterestPoint> {
    const info = this.ormRepository.create(interestPointData);

    await this.ormRepository.save(info);

    return info;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `InterestPoint_id: ${id} deleted`;
  }

  public async save(interest_point: InterestPoint): Promise<InterestPoint> {
    return this.ormRepository.save(interest_point);
  }
}
