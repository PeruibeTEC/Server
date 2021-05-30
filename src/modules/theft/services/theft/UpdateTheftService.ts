import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftRepository from '@modules/theft/repositories/ITheftRepository';
import Theft from '@modules/theft/infra/typeorm/entities/Theft';

interface IRequest {
  theft_id: string;
  date: Date;
  time: Date;
  description: string;
  title: string;
  theft_location_id: string;
  user_id: string;
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
    title,
    description,
    user_id,
  }: IRequest): Promise<Theft> {
    const theft = await this.theftRepository.findById(theft_id);
    const checkTitleExists = await this.theftRepository.findByTitle(title);

    if (!theft) {
      throw new AppError('Theft not found.', 404);
    }

    if (checkTitleExists) {
      throw new AppError('Title already used.', 409);
    }

    if (title.length > 50) {
      throw new AppError('Title has exceeded the characters limit.', 413);
    }

    if (user_id !== theft?.user_id) {
      throw new AppError(
        'Only the user who created the crime can update the crime',
        409,
      );
    }

    Object.assign(theft, {
      date,
      time,
      description,
      title,
    });

    return this.theftRepository.save(theft);
  }
}
