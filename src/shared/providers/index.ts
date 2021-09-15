import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import IDatefnsProvider from './DatefnsProvider/models/IDatefnsProvider';
import DatefnsProvider from './DatefnsProvider/implementations/DatefnsProvider';
import BCryptHashProvider from './HashProvider/implementantions/BCryptHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);

container.registerSingleton<IDatefnsProvider>(
  'DatefnsProvider',
  DatefnsProvider,
);
