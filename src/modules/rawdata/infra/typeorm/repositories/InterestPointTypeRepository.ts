import { getRepository, Repository } from 'typeorm';

import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import IInterestPointTypeDTO from '@modules/rawdata/dtos/IInterestPointTypeDTO';

import InterestPointType from '../entities/InterestPointType';

export default class InterestPointTypeRepository
  implements IInterestPointTypeRepository {
  private ormRepository: Repository<InterestPointType>;

  constructor() {
    this.ormRepository = getRepository(InterestPointType);
  }

  public async findById(id: string): Promise<InterestPointType | undefined> {
    const interestPointType = await this.ormRepository.findOne(id);

    return interestPointType;
  }

  public async findByName(
    name: string,
  ): Promise<InterestPointType | undefined> {
    const interestPointType = await this.ormRepository.findOne({
      where: { name },
    });

    return interestPointType;
  }

  public async findAllInterestPointType(): Promise<InterestPointType[]> {
    let info: InterestPointType[];

    // eslint-disable-next-line prefer-const
    info = await this.ormRepository.find();

    return info;
  }

  public async create(
    infoData: IInterestPointTypeDTO,
  ): Promise<InterestPointType> {
    const interestPointType = this.ormRepository.create(infoData);

    await this.ormRepository.save(interestPointType);

    return interestPointType;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `InterestPointType_id: ${id} deleted`;
  }

  public async save(
    interestPointType: InterestPointType,
  ): Promise<InterestPointType> {
    return this.ormRepository.save(interestPointType);
  }
}
