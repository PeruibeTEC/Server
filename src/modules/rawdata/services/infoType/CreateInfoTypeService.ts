import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import InfoType from '../../infra/typeorm/entities/InfoType';
import IInfoTypeRepository from '../../repositories/IInfoTypeRepository';

export interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateInfoTypeService {
  constructor(
    @inject('InfoTypeRepository')
    private infoTypeRepository: IInfoTypeRepository,
  ) {}

  public async execute({ name, description }: IRequest): Promise<InfoType> {
    const checkNameExists = await this.infoTypeRepository.findByName(name);
    if (checkNameExists) {
      throw new AppError('InfoType already exists', 403);
    }

    const infoType = await this.infoTypeRepository.create({
      name,
      description,
    });

    return infoType;
  }
}
