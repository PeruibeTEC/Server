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

  public async execute({
    name,
    email_login,
    old_password,
    password,
    description,
    profile_photo,
    background_photo,
    operating_time,
    closing_time,
    closing_day,
    business_type_id,
    business_id,
  }: IRequest): Promise<Business> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    if (business.id !== business_id) {
      throw new AppError(
        'Business does not have permission to update this business.',
        403,
      );
    }

    const verifyBusinessEmail = await this.businessRepository.findByEmail(
      email_login,
    );

    if (verifyBusinessEmail) {
      throw new AppError(`Business e-mail already used`, 409);
    }

    const verifyBusinessName = await this.businessRepository.findByName(name);

    if (verifyBusinessName) {
      throw new AppError(`Business name already used`, 409);
    }

    Object.assign(business, {
      name,
      email_login,
      old_password,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
      business_id,
    });

    return this.businessRepository.save(business);
  }
}
