import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import Business from '../../infra/typeorm/entities/Business';
import BusinessContact from '../../infra/typeorm/entities/BusinessContact';
import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

export interface IRequest {
  contact_email: string;
  cellphone: string;
  tellphone: string;
  business_id: Business;
}

@injectable()
export default class CreateBusinessContactService {
  constructor(
    @inject('BusinessContactRepository')
    private businessContactRepository: IBusinessContactRepository,
  ) {}

  public async execute({
    contact_email,
    cellphone,
    tellphone,
    business_id,
  }: IRequest): Promise<BusinessContact> {
    const checkbusinessContactEmailExists = await this.businessContactRepository.findByContactEmail(
      contact_email,
    );

    if (checkbusinessContactEmailExists) {
      throw new AppError('Email already in use.', 409);
    }

    const businessContact = this.businessContactRepository.create({
      contact_email,
      cellphone,
      tellphone,
      business_id,
    });

    return businessContact;
  }
}
