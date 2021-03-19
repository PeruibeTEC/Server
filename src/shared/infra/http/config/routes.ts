import { Express, Router } from 'express';

import usersRouter from '@modules/user/infra/http/routes/user.routes';
import sessionsRouter from '@modules/user/infra/http/routes/session.routes';

export default (app: Express): void => {
  const router = Router();
  router.use('/user', usersRouter);
  router.use('/session', sessionsRouter);

  app.use('/api', router);
};
