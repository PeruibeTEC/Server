import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IInterestPointRepository from '../../repositories/IInterestPointRepository';

interface IRequest {
  interest_point_id: string;
}

@injectable()
export default class DeleteInterestPointService {
  constructor(
    @inject('InterestPointRepository')
    private interestPointRepository: IInterestPointRepository,
  ) {}

  public async execute({ interest_point_id }: IRequest): Promise<void> {
    const checkInterestPointExists =
      await this.interestPointRepository.findById(interest_point_id);

    if (!checkInterestPointExists) {
      throw new AppError('Interest point not found.', 404);
    }

    await this.interestPointRepository.delete(interest_point_id);
  }
}
