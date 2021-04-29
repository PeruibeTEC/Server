import { injectable, inject } from 'tsyringe';

import BusinessContact from '../../infra/typeorm/entities/BusinessContact';
import IBusinessContactRepository from '../../repositories/IBusinessContactRepository';

@injectable()
export default class IndexBusinessContactService {
  constructor(
    @inject('BusinessContactRepository')
    private businessContactRepository: IBusinessContactRepository,
  ) {}

  public async execute(): Promise<BusinessContact[]> {
    const businessContact = await this.businessContactRepository.findAllBusinessContact();

    return businessContact;
  }
}
