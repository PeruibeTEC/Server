import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessLocationRepository from '../../repositories/IBusinessLocationRepository';

interface IRequest {
  business_location_id: string;
}

@injectable()
export default class DeleteBusinessLocationService {
  constructor(
    @inject('BusinessLocationRepository')
    private businessLocationRepository: IBusinessLocationRepository,
  ) {}

  public async execute({ business_location_id }: IRequest): Promise<void> {
    const businessLocation = await this.businessLocationRepository.findById(
      business_location_id,
    );

    if (!businessLocation) {
      throw new AppError('Business not found.', 404);
    }

    await this.businessLocationRepository.delete(business_location_id);
  }
}
