import { inject, injectable } from 'tsyringe';
import AppError from '@shared/infra/http/errors/AppError';

import ITouristDTO from '@modules/user/dtos/ITouristDTO';
import Tourist from '../../infra/typeorm/entities/Tourist';
import ITouristRepository from '../../repositories/ITouristRepository';

@injectable()
export default class CreateTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,
  ) {}

  public async execute({
    state,
    city,
    is_foreigner,
    country_foreigner,
    user_id,
  }: ITouristDTO): Promise<Tourist> {
    const checkUser = await this.touristRepository.findById(user_id);

    if (!checkUser) {
      throw new AppError('User not found.', 404);
    }

    const tourist = this.touristRepository.create({
      state,
      city,
      is_foreigner,
      country_foreigner,
      user_id,
    });

    return tourist;
  }
}
