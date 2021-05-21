import { Express, Router } from 'express';

import projectRouter from '@modules/project/infra/http/routes/project.routes';
import projectCommentRouter from '@modules/project/infra/http/routes/projectcomment.routes';
import projectPhotoRouter from '@modules/project/infra/http/routes/projectphoto.routes';

import interestPointRouter from '@modules/rawdata/infra/http/routes/interestpoint.routes';
import interestPointTypeRouter from '@modules/rawdata/infra/http/routes/interestpointtype.routes';
import touristSpotRouter from '@modules/rawdata/infra/http/routes/touristspot.routes';
import touristSpotPhotoRouter from '@modules/rawdata/infra/http/routes/touristspotphoto.routes';

import eventTypeUserRouter from '@modules/event/infra/http/routes/eventTypeUser.routes';
import eventUserRouter from '@modules/event/infra/http/routes/eventUser.routes';

import commentRouter from '@modules/social/infra/http/routes/comment.routes';
import likeRouter from '@modules/social/infra/http/routes/like.routes';
import photoPostRouter from '@modules/social/infra/http/routes/photoPost.routes';
import postRouter from '@modules/social/infra/http/routes/post.routes';

import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import profilesRouter from '@modules/user/infra/http/routes/profile.routes';
import sessionsRouter from '@modules/user/infra/http/routes/session.routes';
import touristRouter from '@modules/user/infra/http/routes/tourist.routes';
import touristsessionRouter from '@modules/user/infra/http/routes/touristsession.routes';
import usersRouter from '@modules/user/infra/http/routes/user.routes';

export default (app: Express): void => {
  const router = Router();

  router.use('/user/profile', profilesRouter);
  router.use('/user', usersRouter);
  router.use('/session', sessionsRouter);
  router.use('/password', passwordRouter);

  router.use('/tourist', touristRouter);

  router.use('/interestPoint', interestPointRouter);
  router.use('/interestPointType', interestPointTypeRouter);

  router.use('/touristSession', touristsessionRouter);
  router.use('/touristSpot', touristSpotRouter);
  router.use('/touristSpotPhoto', touristSpotPhotoRouter);

  router.use('/eventTypeUser', eventTypeUserRouter);
  router.use('/eventUser', eventUserRouter);

  router.use('/social/post', postRouter);
  router.use('/social/photoPost', photoPostRouter);
  router.use('/social/comment', commentRouter);
  router.use('/social/like', likeRouter);

  router.use('/project', projectRouter);
  router.use('/project/comment', projectCommentRouter);
  router.use('/project/photo', projectPhotoRouter);

  app.use('/api', router);
};
