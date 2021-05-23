import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessLocationRepository from '../../repositories/IBusinessLocationRepository';

interface IRequest {
  business_location_id: string;
  business_id: string;
}

@injectable()
export default class DeleteBusinessLocationService {
  constructor(
    @inject('BusinessLocationRepository')
    private businessLocationRepository: IBusinessLocationRepository,
  ) {}

  public async execute({
    business_id,
    business_location_id,
  }: IRequest): Promise<void> {
    const businessLocation = await this.businessLocationRepository.findById(
      business_location_id,
    );

    if (!businessLocation) {
      throw new AppError('Business not found.', 404);
    }

    if (businessLocation.business_id !== business_id) {
      throw new AppError(
        'Business does not have permission to delete this location.',
        403,
      );
    }

    await this.businessLocationRepository.delete(business_location_id);
  }
}
