import { injectable, inject } from 'tsyringe';

import EventBusiness from '../../infra/typeorm/entities/EventBusiness';
import IEventBusinessRepository from '../../repositories/IEventBusinessRepository';

@injectable()
export default class IndexEventBusinessService {
  constructor(
    @inject('EventBusinessRepository')
    private eventBusinessRepository: IEventBusinessRepository,
  ) {}

  public async execute(): Promise<EventBusiness[]> {
    const eventBusiness = await this.eventBusinessRepository.findAllEventBusiness();

    return eventBusiness;
  }
}
