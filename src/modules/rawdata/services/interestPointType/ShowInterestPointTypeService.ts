import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import InterestPointType from '@modules/rawdata/infra/typeorm/entities/InterestPointType';
import IInterestPointTypeRepository from '../../repositories/IInterestPointTypeRepository';

interface IRequest {
  interest_point_type_id: string;
}

@injectable()
export default class ShowInterestPointService {
  constructor(
    @inject('InterestPointTypeRepository')
    private interestPointTypeRepository: IInterestPointTypeRepository,
  ) {}

  public async execute({
    interest_point_type_id,
  }: IRequest): Promise<InterestPointType> {
    const checkInterestPointTypeExists = await this.interestPointTypeRepository.findById(
      interest_point_type_id,
    );

    if (!checkInterestPointTypeExists) {
      throw new AppError('Id not found.', 404);
    }

    return checkInterestPointTypeExists;
  }
}
