import { injectable, inject } from 'tsyringe';

import BusinessLocation from '../../infra/typeorm/entities/BusinessLocation';
import IBusinessLocationRepository from '../../repositories/IBusinessLocationRepository';

@injectable()
export default class IndexBusinessLocationService {
  constructor(
    @inject('BusinessLocationRepository')
    private businessLocationRepository: IBusinessLocationRepository,
  ) {}

  public async execute(): Promise<BusinessLocation[]> {
    const businessLocation = await this.businessLocationRepository.findAllBusinessLocation();

    return businessLocation;
  }
}
