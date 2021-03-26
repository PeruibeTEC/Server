import { getRepository, Repository, Not } from 'typeorm';

import IInfoAddressRepository from '@modules/rawdata/repositories/IInfoAddressRepository';
import ICreateInfoAddressDTO from '@modules/rawdata/dtos/ICreateInfoAddressDTO';

import InfoAddress from '../entities/InfoAddress';

export default class InfoAddressRepository implements IInfoAddressRepository {
  private ormRepository: Repository<InfoAddress>;

  constructor() {
    this.ormRepository = getRepository(InfoAddress);
  }

  public async findById(id: string): Promise<InfoAddress | undefined> {
    const infoAddress = await this.ormRepository.findOne(id);

    return infoAddress;
  }

  public async findByDistrict(
    district: string,
  ): Promise<InfoAddress | undefined> {
    const infoAddress = await this.ormRepository.findOne(district);

    return infoAddress;
  }

  public async findAllInfoAddress(
    expect_infoaddress_id?: string,
  ): Promise<InfoAddress[]> {
    let infoAddress: InfoAddress[];

    if (expect_infoaddress_id) {
      infoAddress = await this.ormRepository.find({
        where: {
          id: Not(expect_infoaddress_id),
        },
      });
    } else {
      infoAddress = await this.ormRepository.find();
    }
    return infoAddress;
  }

  public async create(infoData: ICreateInfoAddressDTO): Promise<InfoAddress> {
    const infoAddress = this.ormRepository.create(infoData);

    await this.ormRepository.save(infoAddress);

    return infoAddress;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `InfoAddress_id: ${id} deleted`;
  }

  public async save(infoAddress: InfoAddress): Promise<InfoAddress> {
    return this.ormRepository.save(infoAddress);
  }
}
