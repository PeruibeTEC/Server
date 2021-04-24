import IMailTemplateProvider from '@shared/providers/MailTemplateProvider/models/IMailTemplateProvider';
import { inject, injectable } from 'tsyringe';
import ISendMailDTO from '../dtos/ISendMailDTO';

import IMailProvider from '../models/IMailProvider';

@injectable()
export default class AmazonSESMailProvider implements IMailProvider {
  constructor() {} // private amazonSESMailProvider: IMailTemplateProvider, // @inject('AmazonSESMailProvider')

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendMailDTO): Promise<void> {
    console.log('foi');
  }
}
