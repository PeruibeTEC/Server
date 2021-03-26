import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ICreateInterestPointDTO from '@modules/rawdata/dtos/ICreateInterestPointDTO';
import InterestPoint from '../../infra/typeorm/entities/InterestPoint';
import IInterestPointRepository from '../../repositories/IInterestPointRepository';

@injectable()
export default class CreateInterestPointService {
  constructor(
    @inject('InterestPointRepository')
    private interestPointRepository: IInterestPointRepository,
  ) {}

  public async execute({
    name,
    telephone,
    street,
    number,
    district,
    interest_point_type_id,
  }: ICreateInterestPointDTO): Promise<InterestPoint> {
    const checkInterestPointExists = await this.interestPointRepository.findByName(
      name,
    );

    if (checkInterestPointExists) {
      throw new AppError('Name already used.');
    }

    const interestPoint = this.interestPointRepository.create({
      name,
      telephone,
      street,
      number,
      district,
      interest_point_type_id,
    });

    return interestPoint;
  }
}
