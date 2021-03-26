import { Express, Router } from 'express';

import usersRouter from '@modules/user/infra/http/routes/user.routes';
import profilesRouter from '@modules/user/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/user/infra/http/routes/session.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';

import infoRouter from '@modules/rawdata/infra/http/routes/info.routes';
import infoAddressRouter from '@modules/rawdata/infra/http/routes/infoaddress.routes';

export default (app: Express): void => {
  const router = Router();
  router.use('/user', usersRouter);
  router.use('/user/profile', profilesRouter);
  router.use('/session', sessionsRouter);
  router.use('/password', passwordRouter);
  router.use('/info', infoRouter);
  router.use('/infoaddress', infoAddressRouter);

  app.use('/api', router);
};
