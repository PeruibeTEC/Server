import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import Info from '@modules/rawdata/infra/typeorm/entities/Info';
import IInfoRepository from '../../repositories/IInfoRepository';

interface IRequest {
  info_id: string;
}

@injectable()
export default class ShowInfoService {
  constructor(
    @inject('InfoRepository')
    private infoRepository: IInfoRepository,
  ) {}

  public async execute({ info_id }: IRequest): Promise<Info> {
    const checkInfoExists = await this.infoRepository.findById(info_id);

    if (!checkInfoExists) {
      throw new AppError('Telephone not found.', 404);
    }

    return checkInfoExists;
  }
}
