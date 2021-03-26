import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ICreateInfoDTO from '@modules/rawdata/dtos/ICreateInfoDTO';
import Info from '../../infra/typeorm/entities/Info';
import IInfoRepository from '../../repositories/IInfoRepository';

@injectable()
export default class CreateInfoService {
  constructor(
    @inject('InfoRepository')
    private infoRepository: IInfoRepository,
  ) {}

  public async execute({
    telephone,
    info_address_id,
    info_type_id,
  }: ICreateInfoDTO): Promise<Info> {
    const checkInfoExists = await this.infoRepository.findByTel(telephone);

    if (checkInfoExists) {
      throw new AppError('Telephone already used.');
    }

    const info = this.infoRepository.create({
      telephone,
      info_address_id,
      info_type_id,
    });

    return info;
  }
}
