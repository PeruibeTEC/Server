import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessRepository from '../../repositories/IBusinessRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class DeleteBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({ business_id }: IRequest): Promise<void> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    await this.businessRepository.delete(business_id);
  }
}
