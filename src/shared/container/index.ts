import { container } from 'tsyringe';

import UsersRepository from '@modules/user/infra/typeorm/repositories/UserRepository';
import IUsersRepository from '@modules/user/repositories/IUserRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
