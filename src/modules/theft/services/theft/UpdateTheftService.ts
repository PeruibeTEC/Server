import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftRepository from '@modules/theft/repositories/ITheftRepository';
import Theft from '@modules/theft/infra/typeorm/entities/Theft';

interface IRequest {
  theft_id: string;
  date: Date,
  time: Date,
  description: string,
  theft_location_id: string,
}

@injectable()
export default class UpdateTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({
    theft_id,
    date,
    time,
    description,
    theft_location_id,
  }: IRequest): Promise<Theft> {
    const theft = await this.theftRepository.findById(theft_id);

    if (!theft) {
      throw new AppError('Theft not found.', 404);
    }

    Object.assign(theft, {
      date,
      time,
      description,
      theft_location_id,
    });

    return this.theftRepository.save(theft);
  }
}
