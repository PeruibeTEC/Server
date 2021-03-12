import { Express, Router } from 'express';

import usersRouter from '@modules/user/infra/http/routes/user.routes';

export default (app: Express): void => {
  const router = Router();
  router.use('/user', usersRouter);

  app.use('/api', router);
};
