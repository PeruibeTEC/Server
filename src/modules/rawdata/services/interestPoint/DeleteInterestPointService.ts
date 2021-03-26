import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IInterestPointRepository from '../../repositories/IInterestPointRepository';

interface IRequest {
  name: string;
}

@injectable()
export default class DeleteInterestPointService {
  constructor(
    @inject('InterestPointRepository')
    private interestPointRepository: IInterestPointRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<void> {
    const checkInterestPointExists = await this.interestPointRepository.findByName(
      name,
    );

    if (!checkInterestPointExists) {
      throw new AppError('Interest point not found.', 404);
    }

    await this.interestPointRepository.delete(name);
  }
}
