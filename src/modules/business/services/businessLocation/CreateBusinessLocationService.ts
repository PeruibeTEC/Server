import { injectable, inject } from 'tsyringe';

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
