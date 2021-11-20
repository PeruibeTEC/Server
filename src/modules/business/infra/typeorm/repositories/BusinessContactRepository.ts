import { getRepository, Repository } from 'typeorm';

import IBusinessContactRepository from '@modules/business/repositories/IBusinessContactRepository';
import IBusinessContactDTO from '@modules/business/dtos/IBusinessContactDTO';

import BusinessContact from '../entities/BusinessContact';

export default class BusinessContactRepository
  implements IBusinessContactRepository
{
  private ormRepository: Repository<BusinessContact>;

  constructor() {
    this.ormRepository = getRepository(BusinessContact);
  }

  public async findById(id: string): Promise<BusinessContact | undefined> {
    const businessContact = await this.ormRepository.findOne(id);

    return businessContact;
  }

  public async findByBusiness(
    business_id: string,
  ): Promise<BusinessContact | undefined> {
    const businessContact = await this.ormRepository.findOne(business_id);

    return businessContact;
  }

  public async findByContactEmail(
    contact_email: string,
  ): Promise<BusinessContact | undefined> {
    const businessContact = await this.ormRepository.findOne({
      where: { contact_email },
    });

    return businessContact;
  }

  public async findAllBusinessContact(): Promise<BusinessContact[]> {
    const businessContact = await this.ormRepository.find();

    return businessContact;
  }

  public async create(
    businessContactData: IBusinessContactDTO,
  ): Promise<BusinessContact> {
    const businessContact = this.ormRepository.create(businessContactData);

    await this.ormRepository.save(businessContact);

    return businessContact;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `BusinessContact_id: ${id} deleted`;
  }

  public async save(
    businessContact: BusinessContact,
  ): Promise<BusinessContact> {
    return this.ormRepository.save(businessContact);
  }
}
