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
}

@injectable()
export default class CreateBusinessLocationService {
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
  }: IRequest): Promise<BusinessLocation> {
    const businessExists = this.businessLocationRepository.findByBusiness(
      business_id,
    );

    if (businessExists) {
      throw new AppError('This business already has a location.', 409);
    }

    const businessLocation = this.businessLocationRepository.create({
      street,
      number,
      district,
      latitude,
      longitude,
      description,
      business_id,
    });

    return businessLocation;
  }
}
