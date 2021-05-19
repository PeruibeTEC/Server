import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftLocationRepository from '@modules/theft/repositories/ITheftLocationRepository';
import TheftLocation from '@modules/theft/infra/typeorm/entities/TheftLocation';

interface IRequest {
  street: string;
  number: string;
  district: string;
  latitude: number;
  longitude: number;
  theft_location_id: string;
}

@injectable()
export default class UpdateTheftLocationService {
  constructor(
    @inject('TheftLocationRepository')
    private theftLocationRepository: ITheftLocationRepository,
  ) {}

  public async execute({
    street,
    number,
    district,
    latitude,
    longitude,
    theft_location_id,
  }: IRequest): Promise<TheftLocation> {
    const theftLocation = await this.theftLocationRepository.findById(
      theft_location_id,
    );

    if (!theftLocation) {
      throw new AppError('Location not found.', 404);
    }

    Object.assign(theftLocation, {
      street,
      number,
      district,
      latitude,
      longitude,
    });

    return this.theftLocationRepository.save(theftLocation);
  }
}
