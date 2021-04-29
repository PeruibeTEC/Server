import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessContact from '../../infra/typeorm/entities/BusinessContact';
import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

interface IRequest {
  business_contact_id: string;
}

@injectable()
export default class ShowBusinessContactService {
  constructor(
    @inject('BusinessContactRepository')
    private businessContactRepository: IBusinessContactRepository,
  ) {}

  public async execute({
    business_contact_id,
  }: IRequest): Promise<BusinessContact | undefined> {
    const businessContact = await this.businessContactRepository.findById(
      business_contact_id,
    );

    if (!businessContact) {
      throw new AppError('Business Contact not found.', 404);
    }

    return businessContact;
  }
}
