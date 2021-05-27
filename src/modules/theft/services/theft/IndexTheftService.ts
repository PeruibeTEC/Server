import { injectable, inject } from 'tsyringe';

import Theft from '@modules/theft/infra/typeorm/entities/Theft';
import ITheftRepository from '../../repositories/ITheftRepository';

interface IRequest {
  user_id: string;
}

@injectable()
export default class IndexTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<Theft[] | undefined> {
    if (user_id) {
      const theftByUser = await this.theftRepository.findAllTheftByUser(
        user_id,
      );
      return theftByUser;
    }

    const theft = await this.theftRepository.findAllTheft();
    return theft;
  }
}
