import { getRepository, Repository, Not } from 'typeorm';

import IInfoTypeRepository from '@modules/rawdata/repositories/IInfoTypeRepository';
import ICreateInfoTypeDTO from '@modules/rawdata/dtos/ICreateInfoTypeDTO';

import InfoType from '../entities/InfoType';

export default class InfoTypeRepository implements IInfoTypeRepository {
  private ormRepository: Repository<InfoType>;

  constructor() {
    this.ormRepository = getRepository(InfoType);
  }

  public async findById(id: string): Promise<InfoType | undefined> {
    const infoType = await this.ormRepository.findOne(id);

    return infoType;
  }

  public async findByName(name: string): Promise<InfoType | undefined> {
    const infoType = await this.ormRepository.findOne({
      where: { name },
    });

    return infoType;
  }

  public async findAllInfoType(
    expect_infoaddress_id?: string,
  ): Promise<InfoType[]> {
    let infoType: InfoType[];

    if (expect_infoaddress_id) {
      infoType = await this.ormRepository.find({
        where: {
          id: Not(expect_infoaddress_id),
        },
      });
    } else {
      infoType = await this.ormRepository.find();
    }
    return infoType;
  }

  public async create(infoData: ICreateInfoTypeDTO): Promise<InfoType> {
    const infoType = this.ormRepository.create(infoData);

    await this.ormRepository.save(infoType);

    return infoType;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `InfoType_id: ${id} deleted`;
  }

  public async save(infoType: InfoType): Promise<InfoType> {
    return this.ormRepository.save(infoType);
  }
}
