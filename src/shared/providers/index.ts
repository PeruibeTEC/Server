import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import IDatefnsProvider from './DatefnsProvider/models/IDatefnsProvider';
import DatefnsProvider from './DatefnsProvider/implementations/DatefnsProvider';
import BCryptHashCitizenProvider from './HashProvider/implementantions/BCryptHashProvider';

container.registerSingleton<IHashProvider>(
  'HashCitizenProvider',
  BCryptHashCitizenProvider,
);

container.registerSingleton<IDatefnsProvider>(
  'DatefnsProvider',
  DatefnsProvider,
);
