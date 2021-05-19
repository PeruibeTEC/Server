import { container } from 'tsyringe';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashCitizenProvider from './HashProvider/implementantions/BCryptHashCitizenProvider';

container.registerSingleton<IHashProvider>(
  'HashCitizenProvider',
  BCryptHashCitizenProvider,
);
