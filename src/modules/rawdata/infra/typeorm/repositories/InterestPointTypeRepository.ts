import { getRepository, Repository, Not } from 'typeorm';

import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import ICreateInterestPointTypeDTO from '@modules/rawdata/dtos/ICreateInterestPointTypeDTO';

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

  public async findAllInterestPointType(
    expect_infoaddress_id?: string,
  ): Promise<InterestPointType[]> {
    let interestPointType: InterestPointType[];

    if (expect_infoaddress_id) {
      interestPointType = await this.ormRepository.find({
        where: {
          id: Not(expect_infoaddress_id),
        },
      });
    } else {
      interestPointType = await this.ormRepository.find();
    }
    return interestPointType;
  }

  public async create(
    infoData: ICreateInterestPointTypeDTO,
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
