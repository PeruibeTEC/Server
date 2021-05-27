import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import Theft from '../../infra/typeorm/entities/Theft';
import ITheftRepository from '../../repositories/ITheftRepository';

interface IRequest {
  date: Date;
  time: Date;
  description: string;
  title: string;
  theft_location_id: string;
  user_id: string;
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
    title,
    theft_location_id,
    user_id,
  }: IRequest): Promise<Theft> {
    const checkTitleExists = await this.theftRepository.findByTitle(title);

    if (checkTitleExists) {
      throw new AppError('Title already used.', 409);
    }

    const theft = this.theftRepository.create({
      date,
      time,
      description,
      title,
      theft_location_id,
      user_id,
    });

    return theft;
  }
}
