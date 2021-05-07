import { injectable, inject } from 'tsyringe';

import BusinessComment from '../../infra/typeorm/entities/BusinessComment';
import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

interface IRequest {
  business_comment_id: string;
}

@injectable()
export default class ShowBusinessCommentService {
  constructor(
    @inject('BusinessCommentRepository')
    private businessCommentRepository: IBusinessCommentRepository,
  ) {}

  public async execute({
    business_comment_id,
  }: IRequest): Promise<BusinessComment | undefined> {
    const businessRating = await this.businessCommentRepository.findById(
      business_comment_id,
    );

    return businessRating;
  }
}
