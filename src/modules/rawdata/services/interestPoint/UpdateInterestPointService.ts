import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IInterestPointRepository from '@modules/rawdata/repositories/IInterestPointRepository';
import InterestPoint from '@modules/rawdata/infra/typeorm/entities/InterestPoint';

interface IRequest {
  interest_point_type_id: string;
  interest_point_id: string;
  name: string;
  street: string;
  district: string;
  number: string;
  telephone: string;
}

@injectable()
export default class UpdateInterestPointService {
  constructor(
    @inject('InterestPointRepository')
    private interestPoint: IInterestPointRepository,

    @inject('InterestPointTypeRepository')
    private interestPointType: IInterestPointRepository,
  ) {}

  public async execute({
    interest_point_id,
    interest_point_type_id,
    name,
    street,
    district,
    number,
    telephone,
  }: IRequest): Promise<InterestPoint> {
    const pointType = await this.interestPointType.findById(
      interest_point_type_id,
    );

    if (!pointType) {
      throw new AppError('Point Type not found.', 404);
    }

    const interestPoint = await this.interestPoint.findById(interest_point_id);

    if (!interestPoint) {
      throw new AppError('Point not found.', 404);
    }

    const interestWithUpdatedName = await this.interestPoint.findByName(name);

    if (
      interestWithUpdatedName &&
      interestWithUpdatedName.id !== interest_point_id
    ) {
      throw new AppError('Name already in use.', 409);
    }

    Object.assign(interestPoint, { name, street, district, number, telephone });

    return this.interestPoint.save(interestPoint);
  }
}
