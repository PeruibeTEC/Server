import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/infra/http/errors/AppError';

import InfoAddress from '../../infra/typeorm/entities/InfoAddress';
import IInfoAddressRepository from '../../repositories/IInfoAddressRepository';

export interface IRequest {
  street: string;
  number: string;
  district: string;
}

@injectable()
export default class CreateInfoAddressService {
  constructor(
    @inject('InfoAddressRepository')
    private infoAddressRepository: IInfoAddressRepository,
  ) {}

  public async execute({
    street,
    number,
    district,
  }: IRequest): Promise<InfoAddress> {
    // to do: if street, number, district combination is
    // equal to one in the database, return 'Info already exists'

    const infoAddress = this.infoAddressRepository.create({
      street,
      number,
      district,
    });

    return infoAddress;
  }
}
