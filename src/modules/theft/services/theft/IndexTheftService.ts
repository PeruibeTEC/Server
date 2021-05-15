import { injectable, inject } from 'tsyringe';
import Theft from '@modules/theft/infra/typeorm/entities/Theft';
import ITheftRepository from '../../repositories/ITheftRepository';

@injectable()
export default class IndexTheftService {
  constructor(
    @inject('TheftRepository')
    private theftRepository: ITheftRepository,
  ) {}

  public async execute(): Promise<Theft[]> {
    const theft = await this.theftRepository.findAllTheft();

    return theft;
  }
}
