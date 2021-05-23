import { container } from 'tsyringe';

import IMailTemplateProvider from './MailTemplateProvider/models/IMailTemplateProvider';
import HandlebarsMailTemplateProvider from './MailTemplateProvider/implementations/HandleBarsMailTemplateProvider';

import IMailProvider from './AmazonSESProvider/models/IMailProvider';
import AmazonSESMailProvider from './AmazonSESProvider/implementations/AmazonSESMailProvider';

container.registerSingleton<IMailTemplateProvider>(
  'MailTemplateProvider',
  HandlebarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
  'AmazonSESMailProvider',
  container.resolve(AmazonSESMailProvider),
);
