import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftLocationRepository from '../../repositories/ITheftLocationRepository';

interface IRequest {
  theft_location_id: string;
}

@injectable()
export default class DeleteTheftLocationService {
  constructor(
    @inject('TheftLocationRepository')
    private theftLocationRepository: ITheftLocationRepository,
  ) {}

  public async execute({ theft_location_id }: IRequest): Promise<void> {
    const checkTheftLocationExists = await this.theftLocationRepository.findById(
      theft_location_id,
    );

    if (!checkTheftLocationExists) {
      throw new AppError('Location not found.', 404);
    }

    await this.theftLocationRepository.delete(theft_location_id);
  }
}
