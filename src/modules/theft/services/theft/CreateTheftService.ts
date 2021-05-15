import { injectable, inject } from 'tsyringe';

import Theft from '../../infra/typeorm/entities/Theft';
import ITheftRepository from '../../repositories/ITheftRepository';

interface IRequest {
  date: Date,
  time: Date,
  description: string,
  theft_location_id: string,
  user_id: string,
}

@injectable()
export default class CreateTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({
    date,
    time,
    description,
    theft_location_id,
    user_id,
  }: IRequest): Promise<Theft> {
    const theft = this.theftRepository.create({
      date,
      time,
      description,
      theft_location_id,
      user_id,
    });

    return theft;
  }
}
