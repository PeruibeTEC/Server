import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import InterestPointType from '@modules/rawdata/infra/typeorm/entities/InterestPointType';

interface IRequest {
  interest_point_type_id: string;
  name: string;
  description: string;
}

@injectable()
export default class UpdateInterestPointTypeService {
  constructor(
    @inject('InterestPointTypeRepository')
    private interestPointType: IInterestPointTypeRepository,
  ) {}

  public async execute({
    interest_point_type_id,
    name,
    description,
  }: IRequest): Promise<InterestPointType> {
    const pointType = await this.interestPointType.findById(
      interest_point_type_id,
    );

    if (!pointType) {
      throw new AppError('Point Type not found.', 404);
    }

    const interestTypeWithUpdatedName = await this.interestPointType.findByName(
      name,
    );

    if (
      interestTypeWithUpdatedName &&
      interestTypeWithUpdatedName.id !== interest_point_type_id
    ) {
      throw new AppError('Name already in use.', 409);
    }

    Object.assign(pointType, { name, description });

    return this.interestPointType.save(pointType);
  }
}
