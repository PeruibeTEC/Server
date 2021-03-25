import { injectable, inject } from 'tsyringe';

import AppError from '@/shared/infra/http/errors/AppError';

import Info from '../infra/typeorm/entities/Info';
import IInfoRepository from '../repositories/IInfoRepository';

export interface IRequest {
  telephone: string;
}

@injectable()
export default class CreateInfoService {
  constructor(
    @inject('InfoRepository')
    private infoRepository: IInfoRepository,
  ) {}

  public async execute({ telephone }: IRequest): Promise<Info> {
    const checkInfoExists = await this.infoRepository.findByTel(telephone);

    if (checkInfoExists) {
      throw new AppError('Telephone already used.');
    }

    const info = this.infoRepository.create({ telephone });

    return info;
  }
}
