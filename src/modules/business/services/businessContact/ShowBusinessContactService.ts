import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import BusinessContact from '../../infra/typeorm/entities/BusinessContact';
import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class ShowBusinessContactService {
  constructor(
    @inject('BusinessContactRepository')
    private businessContactRepository: IBusinessContactRepository,
  ) {}

  public async execute({
    business_id,
  }: IRequest): Promise<BusinessContact | undefined> {
    const businessContact = await this.businessContactRepository.findByBusiness(
      business_id,
    );

    if (!businessContact) {
      throw new AppError('Business Contact not found.', 404);
    }

    return businessContact;
  }
}
