import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

// import { azureCreate } from '@shared/infra/azure/imageStorage/imageUpload';
import Business from '../../infra/typeorm/entities/Business';
import BusinessType from '../../infra/typeorm/entities/BusinessType';
import IBusinessRepository from '../../repositories/IBusinessRepository';
import IHashProvider from '../../providers/HashProvider/models/IHashProvider';

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
  business_type_id: BusinessType;
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

    // todo: create business background and profile default photos
    /* if (profile_photo === undefined) {
      profile_photo =
        'https://peruibetec.blob.core.windows.net/user-images/default.jpg';
    } else {
      profile_photo = azureCreate('user-images', profile_photo);
    }
    */

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
