import { injectable, inject } from 'tsyringe';

import BusinessComment from '../../infra/typeorm/entities/BusinessComment';
import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class IndexBusinessCommentByBusinessService {
  constructor(
    @inject('BusinessCommentRepository')
    private businessCommentRepository: IBusinessCommentRepository,
  ) {}

  public async execute({
    business_id,
  }: IRequest): Promise<BusinessComment[] | undefined> {
    const businessRating = await this.businessCommentRepository.findAllByBusiness(
      business_id,
    );

    return businessRating;
  }
}
