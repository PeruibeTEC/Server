import ITouristDTO from '@modules/user/dtos/ITouristDTO';
import { inject, injectable } from 'tsyringe';
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
