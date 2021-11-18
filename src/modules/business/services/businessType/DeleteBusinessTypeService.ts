import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessTypeRepository from '../../repositories/IBusinessTypeRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteBusinessTypeService {
  constructor(
    @inject('BusinessTypeRepository')
    private businessTypeRepository: IBusinessTypeRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const businessType = await this.businessTypeRepository.findById(id);

    if (!businessType) {
      throw new AppError('Business Type not found.', 404);
    }

    await this.businessTypeRepository.delete(id);
  }
}
