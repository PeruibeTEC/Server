import { injectable, inject } from 'tsyringe';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

@injectable()
export default class IndexBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute(): Promise<Business[]> {
    const business = await this.businessRepository.findAllBusiness();

    return business;
  }
}
