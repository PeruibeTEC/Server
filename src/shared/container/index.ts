import { container } from 'tsyringe';

import '@modules/user/providers';

import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/user/repositories/IUserRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/user/repositories/IUserTokenRepository';
import IInterestPointRepository from '@modules/rawdata/repositories/IInterestPointRepository';
import InterestPointRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointRepository';
import IInterestPointTypeRepository from '@modules/rawdata/repositories/IInterestPointTypeRepository';
import InterestPointTypeRepository from '@modules/rawdata/infra/typeorm/repositories/InterestPointTypeRepository';
import ITouristSpotRepository from '@modules/rawdata/repositories/ITouristSpotRepository';
import TouristSpotRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotRepository';
import ITouristSpotPhotoRepository from '@modules/rawdata/repositories/ITouristSpotPhotoRepository';
import TouristSpotPhotoRepository from '@modules/rawdata/infra/typeorm/repositories/TouristSpotPhotoRepository';

import EventTypeUserRepository from '@modules/event/infra/typeorm/repositories/EventTypeUserRepository';
import IEventTypeUserRepository from '@modules/event/repositories/IEventTypeUserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);

container.registerSingleton<IInterestPointRepository>(
  'InterestPointRepository',
  InterestPointRepository,
);

container.registerSingleton<IInterestPointTypeRepository>(
  'InterestPointTypeRepository',
  InterestPointTypeRepository,
);

container.registerSingleton<ITouristSpotRepository>(
  'TouristSpotRepository',
  TouristSpotRepository,
);

container.registerSingleton<ITouristSpotPhotoRepository>(
  'TouristSpotPhotoRepository',
  TouristSpotPhotoRepository,
);

container.registerSingleton<IEventTypeUserRepository>(
  'EventTypeUserRepository',
  EventTypeUserRepository,
);
