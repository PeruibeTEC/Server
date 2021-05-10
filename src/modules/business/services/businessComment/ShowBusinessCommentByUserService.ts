import { injectable, inject } from 'tsyringe';

import BusinessComment from '../../infra/typeorm/entities/BusinessComment';
import IBusinessCommentRepository from '../../repositories/IBusinessCommentRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class ShowBusinessCommentService {
  constructor(
    @inject('BusinessCommentRepository')
    private businessCommentRepository: IBusinessCommentRepository,
  ) {}

  public async execute({
    user_id,
  }: IRequest): Promise<BusinessComment | undefined> {
    const businessRating = await this.businessCommentRepository.findByUser(
      user_id,
    );

    return businessRating;
  }
}
