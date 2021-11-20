import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessContact from '../../infra/typeorm/entities/BusinessContact';
import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

export interface IRequest {
  contact_email: string;
  cellphone: string;
  tellphone: string;
  business_contact_id: string;
  business_id: string;
}

@injectable()
export default class UpdateBusinessContactService {
  constructor(
    @inject('BusinessContactRepository')
    private businessContactRepository: IBusinessContactRepository,
  ) {}

  public async execute({
    business_id,
    business_contact_id,
    contact_email,
    cellphone,
    tellphone,
  }: IRequest): Promise<BusinessContact> {
    const businessContact = await this.businessContactRepository.findById(
      business_contact_id,
    );

    if (!businessContact) {
      throw new AppError('Business  not found.', 404);
    }

    const checkbusinessContactEmailExists =
      await this.businessContactRepository.findByContactEmail(contact_email);

    if (checkbusinessContactEmailExists) {
      throw new AppError('Email already in use.', 409);
    }

    if (businessContact.business_id !== business_id) {
      throw new AppError(
        'Business does not have permission to update this contact.',
        403,
      );
    }

    Object.assign(businessContact, { contact_email, cellphone, tellphone });

    return this.businessContactRepository.save(businessContact);
  }
}
