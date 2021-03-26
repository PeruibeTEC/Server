import { getRepository, Repository, Not } from 'typeorm';

import IInfoRepository from '@modules/rawdata/repositories/IInfoRepository';
import ICreateInfoDTO from '@modules/rawdata/dtos/ICreateInfoDTO';

import Info from '../entities/Info';

export default class InfoRepository implements IInfoRepository {
  private ormRepository: Repository<Info>;

  constructor() {
    this.ormRepository = getRepository(Info);
  }

  public async findById(id: string): Promise<Info | undefined> {
    const info = await this.ormRepository.findOne(id);

    return info;
  }

  public async findByTel(telephone: string): Promise<Info | undefined> {
    const info = await this.ormRepository.findOne(telephone);

    return info;
  }

  public async findAllInfo(expect_info_id?: string): Promise<Info[]> {
    let info: Info[];

    if (expect_info_id) {
      info = await this.ormRepository.find({
        where: {
          id: Not(expect_info_id),
        },
      });
    } else {
      info = await this.ormRepository.find();
    }
    return info;
  }

  public async create(infoData: ICreateInfoDTO): Promise<Info> {
    const info = this.ormRepository.create(infoData);

    await this.ormRepository.save(info);

    return info;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Info_id: ${id} deleted`;
  }

  public async save(info: Info): Promise<Info> {
    return this.ormRepository.save(info);
  }
}
