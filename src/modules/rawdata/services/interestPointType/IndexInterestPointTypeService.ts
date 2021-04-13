import { injectable, inject } from 'tsyringe';
import InterestPointType from '../../infra/typeorm/entities/InterestPointType';
import IInterestPointTypeRepository from '../../repositories/IInterestPointTypeRepository';

@injectable()
export default class ListInterestPointTypeService {
  constructor(
    @inject('InterestPointTypeRepository')
    private interestPointTypeRepository: IInterestPointTypeRepository,
  ) {}

  public async execute(): Promise<InterestPointType[]> {
    const interest_point_type = await this.interestPointTypeRepository.findAllInterestPointType();

    return interest_point_type;
  }
}
