import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import InterestPoint from '@modules/rawdata/infra/typeorm/entities/InterestPoint';
import IInterestPointRepository from '../../repositories/IInterestPointRepository';

interface IRequest {
  interest_point_id: string;
}

@injectable()
export default class ShowInterestPointService {
  constructor(
    @inject('InterestPointRepository')
    private interestPointRepository: IInterestPointRepository,
  ) {}

  public async execute({
    interest_point_id,
  }: IRequest): Promise<InterestPoint> {
    const checkInterestPointExists = await this.interestPointRepository.findById(
      interest_point_id,
    );

    if (!checkInterestPointExists) {
      throw new AppError('Name not found.', 404);
    }

    return checkInterestPointExists;
  }
}
