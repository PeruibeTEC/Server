import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import InterestPointType from '../../infra/typeorm/entities/InterestPointType';
import IInterestPointTypeRepository from '../../repositories/IInterestPointTypeRepository';

export interface IRequest {
  name: string;
  description: string;
}

@injectable()
export default class CreateInterestPointTypeService {
  constructor(
    @inject('InterestPointTypeRepository')
    private interestPointTypeRepository: IInterestPointTypeRepository,
  ) {}

  public async execute({
    name,
    description,
  }: IRequest): Promise<InterestPointType> {
    const checkNameExists = await this.interestPointTypeRepository.findByName(
      name,
    );
    if (checkNameExists) {
      throw new AppError('Interest point type already exists', 403);
    }

    const interestPointType = await this.interestPointTypeRepository.create({
      name,
      description,
    });

    return interestPointType;
  }
}
