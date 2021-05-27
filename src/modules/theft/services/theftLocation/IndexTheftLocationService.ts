import { injectable, inject } from 'tsyringe';

import TheftLocation from '@modules/theft/infra/typeorm/entities/TheftLocation';
import ITheftLocationRepository from '../../repositories/ITheftLocationRepository';

interface IRequest {
  district: string;
}
@injectable()
export default class IndexTheftLocationService {
  constructor(
    @inject('TheftLocationRepository')
    private theftLocationRepository: ITheftLocationRepository,
  ) {}

  public async execute({
    district,
  }: IRequest): Promise<TheftLocation[] | undefined> {
    if (district) {
      const locationDistrict = await this.theftLocationRepository.findByDistrict(
        district,
      );

      return locationDistrict;
    }

    const theftLocation = await this.theftLocationRepository.findAllTheftLocation();
    return theftLocation;
  }
}
