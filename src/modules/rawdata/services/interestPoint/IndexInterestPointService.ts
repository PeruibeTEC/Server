import { injectable, inject } from 'tsyringe';
import InterestPoint from '@modules/rawdata/infra/typeorm/entities/InterestPoint';
import IInterestPointRepository from '../../repositories/IInterestPointRepository';

@injectable()
export default class ShowInterestPointService {
  constructor(
    @inject('InterestPointRepository')
    private interestPointRepository: IInterestPointRepository,
  ) {}

  public async execute(): Promise<InterestPoint[]> {
    const interest_point = await this.interestPointRepository.findAllInterestPoint();

    return interest_point;
  }
}
