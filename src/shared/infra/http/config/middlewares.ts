import { Express } from 'express';
import { bodyParser, contentType, cors } from '../middlewares';
import helmet from 'helmet';

export default (app: Express): void => {
  app.use(bodyParser);
  app.use(cors);
  app.use(contentType);
  app.use(helmet());
};
