import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITheftRepository from '../../repositories/ITheftRepository';

interface IRequest {
  theft_id: string;
  user_id: string;
}

@injectable()
export default class DeleteTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({ theft_id, user_id }: IRequest): Promise<void> {
    const checkTheftExists = await this.theftRepository.findById(theft_id);

    if (user_id !== checkTheftExists?.user_id) {
      throw new AppError('Only the user who created the crime can delete the crime', 409)
    }

    if (!checkTheftExists) {
      throw new AppError('Theft not found.', 404);
    }

    await this.theftRepository.delete(theft_id);
  }
}
