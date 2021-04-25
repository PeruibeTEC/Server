import AppError from '@shared/infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import ITouristRepository from '../../repositories/ITouristRepository';

interface IRequest {
  tourist_id: string;
}

@injectable()
export default class DeleteTouristService {
  constructor(
    @inject('TouristRepository')
    private touristRepository: ITouristRepository,
  ) {}

  public async execute({ tourist_id }: IRequest): Promise<void> {
    const checkTouristExists = await this.touristRepository.findById(
      tourist_id,
    );

    if (!checkTouristExists) {
      throw new AppError('Tourist not found.', 404);
    }

    await this.touristRepository.delete(tourist_id);
  }
}
