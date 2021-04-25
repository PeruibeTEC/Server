import Tourist from '@modules/user/infra/typeorm/entities/Tourist';
import { inject, injectable } from 'tsyringe';
import ITouristRepository from '../../repositories/ITouristRepository';

@injectable()
export default class IndexTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,
  ) {}

  public async execute(): Promise<Tourist[]> {
    const tourist = await this.touristRepository.findAllTourists();

    return tourist;
  }
}
