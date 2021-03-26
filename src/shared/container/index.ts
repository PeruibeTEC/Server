import { container } from 'tsyringe';

import '@modules/user/providers';

import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/user/repositories/IUserRepository';
import UserTokensRepository from '@modules/user/infra/typeorm/repositories/UserTokenRepository';
import IUserTokenRepository from '@modules/user/repositories/IUserTokenRepository';
import IInfoRepository from '@modules/rawdata/repositories/IInfoRepository';
import InfoRepository from '@modules/rawdata/infra/typeorm/repositories/InfoRepository';
import IInfoAddressRepository from '@modules/rawdata/repositories/IInfoAddressRepository';
import InfoAddressRepository from '@modules/rawdata/infra/typeorm/repositories/InfoAddressRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  'UserTokenRepository',
  UserTokensRepository,
);

container.registerSingleton<IInfoRepository>('InfoRepository', InfoRepository);

container.registerSingleton<IInfoAddressRepository>(
  'InfoAddressRepository',
  InfoAddressRepository,
);
