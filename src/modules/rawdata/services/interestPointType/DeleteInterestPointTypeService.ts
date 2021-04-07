import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IInterestPointTypeRepository from '../../repositories/IInterestPointTypeRepository';

interface IRequest {
  interest_point_type_id: string;
}

@injectable()
export default class DeleteInterestPointTypeService {
  constructor(
    @inject('InterestPointTypeRepository')
    private interestPointTypeRepository: IInterestPointTypeRepository,
  ) {}

  public async execute({ interest_point_type_id }: IRequest): Promise<void> {
    const checkInterestPointExists = await this.interestPointTypeRepository.findById(
      interest_point_type_id,
    );

    if (!checkInterestPointExists) {
      throw new AppError('Interest point type not found.', 404);
    }

    await this.interestPointTypeRepository.delete(interest_point_type_id);
  }
}
