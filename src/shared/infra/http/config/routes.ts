import { Express, Router } from 'express';

import usersRouter from '@modules/user/infra/http/routes/user.routes';
import profilesRouter from '@modules/user/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/user/infra/http/routes/session.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';

import interestPointRouter from '@modules/rawdata/infra/http/routes/interestpoint.routes';
import interestPointTypeRouter from '@modules/rawdata/infra/http/routes/interestpointtype.routes';
import touristSpotRouter from '@modules/rawdata/infra/http/routes/touristspot.routes';
import touristSpotPhotoRouter from '@modules/rawdata/infra/http/routes/touristspotphoto.routes';

import projectRouter from '@modules/project/infra/http/routes/project.routes';
import projectCommentRouter from '@modules/project/infra/http/routes/projectcomment.routes';

export default (app: Express): void => {
  const router = Router();
  router.use('/user', usersRouter);
  router.use('/user/profile', profilesRouter);
  router.use('/session', sessionsRouter);
  router.use('/password', passwordRouter);

  router.use('/interestPoint', interestPointRouter);
  router.use('/interestPointType', interestPointTypeRouter);

  router.use('/touristSpot', touristSpotRouter);
  router.use('/touristSpotPhoto', touristSpotPhotoRouter);

  router.use('/project', projectRouter);
  router.use('/projectComment', projectCommentRouter);

  app.use('/api', router);
};
