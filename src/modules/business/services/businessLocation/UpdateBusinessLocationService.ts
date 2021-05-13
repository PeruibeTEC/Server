import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessLocation from '../../infra/typeorm/entities/BusinessLocation';
import IBusinessLocationRepository from '../../repositories/IBusinessLocationRepository';

export interface IRequest {
  street: string;
  number: string;
  district: string;
  latitude: number;
  longitude: number;
  description: string;
  business_id: string;
  business_location_id: string;
}

@injectable()
export default class UpdateBusinessLocationService {
  constructor(
    @inject('BusinessLocationRepository')
    private businessLocationRepository: IBusinessLocationRepository,
  ) {}

  public async execute({
    street,
    number,
    district,
    latitude,
    longitude,
    description,
    business_id,
    business_location_id,
  }: IRequest): Promise<BusinessLocation> {
    const businessLocation = await this.businessLocationRepository.findById(
      business_location_id,
    );

    if (!businessLocation) {
      throw new AppError('Business not found.', 404);
    }

    Object.assign(businessLocation, {
      street,
      number,
      district,
      latitude,
      longitude,
      description,
      business_id,
    });

    return this.businessLocationRepository.save(businessLocation);
  }
}
