import { Express, Router } from 'express';

import usersRouter from '@modules/user/infra/http/routes/user.routes';
import profilesRouter from '@modules/user/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/user/infra/http/routes/session.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';

import interestPointRouter from '@modules/rawdata/infra/http/routes/interestpoint.routes';
import interestPointTypeRouter from '@modules/rawdata/infra/http/routes/interestpointtype.routes';
import touristSpotRouter from '@modules/rawdata/infra/http/routes/touristspot.routes';
import touristSpotPhotoRouter from '@modules/rawdata/infra/http/routes/touristspotphoto.routes';

import postRouter from '@modules/social/infra/http/routes/post.routes';
import commentRouter from '@modules/social/infra/http/routes/comment.routes';

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

  router.use('/social/post', postRouter);
  router.use('/social/comment', commentRouter);

  app.use('/api', router);
};
