import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

interface IRequest {
  name: string;
  email_login: string;
  old_password?: string;
  password?: string;
  description: string;
  profile_photo: string;
  background_photo: string;
  operating_time: Date;
  closing_time: Date;
  closing_day: string;
  business_type_id: string;
  business_id: string;
}

@injectable()
export default class UpdateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({ business_id, name }: IRequest): Promise<Business> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business  not found.', 404);
    }

    Object.assign(business, { name });

    return this.businessRepository.save(business);
  }
}
