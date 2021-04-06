import { injectable, inject } from 'tsyringe';
import InterestPointType from '../../infra/typeorm/entities/InterestPointType';
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
  }: IRequest): Promise<InterestPointType[]> {
    const interest_point_type = await this.interestPointTypeRepository.findAllInterestPointType();

    return interest_point_type;
  }
}
