import { injectable, inject } from 'tsyringe';

import TheftLocation from '../../infra/typeorm/entities/TheftLocation';
import ITheftLocationRepository from '../../repositories/ITheftLocationRepository';

interface IRequest {
  street: string;
  number: string;
  district: string;
  latitude: number;
  longitude: number;
}

@injectable()
export default class CreateTheftLocationService {
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
  }: IRequest): Promise<TheftLocation> {
    const theftLocation = this.theftLocationRepository.create({
      street,
      number,
      district,
      latitude,
      longitude,
    });

    return theftLocation;
  }
}
