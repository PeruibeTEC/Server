import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessLocation from '../../infra/typeorm/entities/BusinessLocation';
import IBusinessLocationRepository from '../../repositories/IBusinessLocationRepository';

interface IRequest {
  business_location_id: string;
}

@injectable()
export default class ShowBusinessLocationService {
  constructor(
    @inject('BusinessLocationRepository')
    private businessLocationRepository: IBusinessLocationRepository,
  ) {}

  public async execute({
    business_location_id,
  }: IRequest): Promise<BusinessLocation | undefined> {
    const businessLocation = await this.businessLocationRepository.findById(
      business_location_id,
    );

    if (!businessLocation) {
      throw new AppError('Business Location not found.', 404);
    }

    return businessLocation;
  }
}
