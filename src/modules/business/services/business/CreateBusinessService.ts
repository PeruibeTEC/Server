import { injectable, inject } from 'tsyringe';

import { azureCreate } from '@shared/infra/azure/imageStorage/imageUpload';

import AppError from '@shared/infra/http/errors/AppError';

import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

export interface IRequest {
  name: string;
  email_login: string;
  password: string;
  description: string;
  profile_photo: string;
  background_photo: string;
  operating_time: Date;
  closing_time: Date;
  closing_day: string;
  business_type_id: string;
}

@injectable()
export default class CreateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email_login,
    password,
    description,
    profile_photo,
    background_photo,
    operating_time,
    closing_time,
    closing_day,
    business_type_id,
  }: IRequest): Promise<Business> {
    const checkBusinessExists = await this.businessRepository.findByName(name);

    if (checkBusinessExists) {
      throw new AppError('Business already exists.', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (profile_photo === undefined) {
      profile_photo =
        'https://peruibetec.blob.core.windows.net/business-images/default.jpg';
    } else {
      profile_photo = azureCreate('business-images', profile_photo);
    }
    background_photo = azureCreate('business-images', background_photo);

    const business = this.businessRepository.create({
      name,
      email_login,
      password: hashedPassword,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    });

    return business;
  }
}
