import { inject, injectable } from 'tsyringe';
import EventUser from '../../infra/typeorm/entities/EventTypeUser';
import IEventUserRepository from '../../repositories/IEventUserRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

@injectable()
export default class IndexEventUserService {
  constructor(
    @inject('EventUserRepository')
    private eventUserRepository: IEventUserRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<EventUser[]> {
    let eventsUser = await this.cacheProvider.recover<EventUser[]>(
      'events-user',
    );

    if (!eventsUser) {
      eventsUser = await this.eventUserRepository.findAllEventUser();
      console.log('Query feita!');
      await this.cacheProvider.save('events-user', eventsUser);
    }

    return eventsUser;
  }
}
