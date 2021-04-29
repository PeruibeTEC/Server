import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

interface IRequest {
  business_contact_id: string;
}

@injectable()
export default class DeleteBusinessContactService {
  constructor(
    @inject('BusinessContactRepository')
    private businessContactRepository: IBusinessContactRepository,
  ) {}

  public async execute({ business_contact_id }: IRequest): Promise<void> {
    const businessContact = await this.businessContactRepository.findById(
      business_contact_id,
    );

    if (!businessContact) {
      throw new AppError('Business not found.', 404);
    }

    await this.businessContactRepository.delete(business_contact_id);
  }
}
