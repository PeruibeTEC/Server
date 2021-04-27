import { container } from 'tsyringe';

import IDatefnsProvider from './DatefnsProvider/models/IDatefnsProvider';
import DatefnsProvider from './DatefnsProvider/implementations/DatefnsProvider';

container.registerSingleton<IDatefnsProvider>(
  'DatefnsProvider',
  DatefnsProvider,
);
