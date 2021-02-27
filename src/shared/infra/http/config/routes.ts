import { Router, Express } from 'express';

export default (app: Express): void => {
  const routes = Router();

  app.use('/api', routes);
};
