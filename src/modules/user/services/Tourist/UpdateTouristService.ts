import Tourist from '@modules/user/infra/typeorm/entities/Tourist';
import ITouristRepository from '@modules/user/repositories/ITouristRepository';
import AppError from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUserRepository from '../../repositories/IUserRepository';

interface IRequest {
  tourist_id: string;
  state?: string;
  city?: string;
  is_foreigner: boolean;
  country_foreigner?: string;
  user_id: string;
}

@injectable()
export default class UpdateTouristService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('TouristRepository')
    private touristRepository: ITouristRepository,
  ) {}

  public async execute({
    tourist_id,
    state,
    city,
    is_foreigner,
    country_foreigner,
    user_id,
  }: IRequest): Promise<Tourist> {
    const checkTourist = await this.touristRepository.findById(tourist_id);
    const checkUserExists = await this.usersRepository.findById(user_id);

    if (!checkTourist || !checkUserExists) {
      throw new AppError('Tourist or User not found.', 404);
    }

    Object.assign(checkTourist, {
      state,
      city,
      is_foreigner,
      country_foreigner,
    });

    return this.touristRepository.save(checkTourist);
  }
}
