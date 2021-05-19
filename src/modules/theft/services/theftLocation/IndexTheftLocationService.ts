import { injectable, inject } from 'tsyringe';

import TheftLocation from '@modules/theft/infra/typeorm/entities/TheftLocation';
import ITheftLocationRepository from '../../repositories/ITheftLocationRepository';

@injectable()
export default class IndexTheftLocationService {
  constructor(
    @inject('TheftLocationRepository')
    private theftLocationRepository: ITheftLocationRepository,
  ) {}

  public async execute(): Promise<TheftLocation[] | undefined> {
    const theftLocation = await this.theftLocationRepository.findAllTheftLocation();

    return theftLocation;
  }
}
