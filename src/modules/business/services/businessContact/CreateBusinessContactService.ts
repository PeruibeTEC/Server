import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessContact from '../../infra/typeorm/entities/BusinessContact';
import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

export interface IRequest {
  contact_email: string;
  cellphone: string;
  tellphone: string;
  business_id: string;
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

    const businessExists = this.businessContactRepository.findByBusiness(
      business_id,
    );

    if (businessExists) {
      throw new AppError('This business already has a contact.', 409);
    }

    const businessContact = await this.businessContactRepository.create({
      contact_email,
      cellphone,
      tellphone,
      business_id,
    });

    if (businessContact.business_id !== business_id) {
      throw new AppError(
        'Business does not have permission to create this contact.',
        403,
      );
    }

    return businessContact;
  }
}
