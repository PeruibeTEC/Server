import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IInfoRepository from '../../repositories/IInfoRepository';

interface IRequest {
  telephone: string;
}

@injectable()
export default class DeleteInfoService {
  constructor(
    @inject('InfoRepository')
    private infoRepository: IInfoRepository,
  ) {}

  public async execute({ telephone }: IRequest): Promise<void> {
    const checkInfoExists = await this.infoRepository.findByTel(telephone);

    if (!checkInfoExists) {
      throw new AppError('Telephone not found.', 404);
    }

    await this.infoRepository.delete(telephone);
  }
}
