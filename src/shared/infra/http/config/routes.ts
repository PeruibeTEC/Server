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
import likeRouter from '@modules/social/infra/http/routes/like.routes';
import photoPostRouter from '@modules/social/infra/http/routes/photoPost.routes';

import projectRouter from '@modules/project/infra/http/routes/project.routes';
import projectCommentRouter from '@modules/project/infra/http/routes/projectcomment.routes';
import projectPhotoRouter from '@modules/project/infra/http/routes/projectphoto.routes';

import businessTypeRouter from '@modules/business/infra/http/routes/businesstype.routes';
import businessRouter from '@modules/business/infra/http/routes/business.routes';
import businessAuthenticateRouter from '@modules/business/infra/http/routes/businessauthenticate.routes';
import businessContactRouter from '@modules/business/infra/http/routes/businesscontact.routes';
import businessLocationRouter from '@modules/business/infra/http/routes/businesslocation.routes';
import businessProductRouter from '@modules/business/infra/http/routes/businessproduct.routes';
import businessRatingRouter from '@modules/business/infra/http/routes/businessrating.routes';
import businessCommentRouter from '@modules/business/infra/http/routes/businesscomment.routes';
import eventTypeBusinessRouter from '@modules/business/infra/http/routes/eventtypebusiness.routes';
import eventBusinessRouter from '@modules/business/infra/http/routes/eventbusiness.routes';
import sessionRouter from '@modules/business/infra/http/routes/session.routes';

export default (app: Express): void => {
  const router = Router();

  // always put especific routes first, and generic routes later
  // e.g: '/a/b' needs to come first and '/a' later

  router.use('/user/profile', profilesRouter);
  router.use('/user/session', sessionsRouter);
  router.use('/user', usersRouter);
  router.use('/password', passwordRouter);

  router.use('/interestPoint', interestPointRouter);
  router.use('/interestPointType', interestPointTypeRouter);

  router.use('/touristSpot', touristSpotRouter);
  router.use('/touristSpotPhoto', touristSpotPhotoRouter);

  router.use('/social/post', postRouter);
  router.use('/social/photoPost', photoPostRouter);
  router.use('/social/comment', commentRouter);
  router.use('/social/like', likeRouter);

  router.use('/project/comment', projectCommentRouter);
  router.use('/project/photo', projectPhotoRouter);
  router.use('/project', projectRouter);

  router.use('/business/contact', businessContactRouter);
  router.use('/business/type', businessTypeRouter);
  router.use('/business/location', businessLocationRouter);
  router.use('/business/product', businessProductRouter);
  router.use('/business/rating', businessRatingRouter);
  router.use('/business/comment', businessCommentRouter);
  router.use('/business/eventtype', eventTypeBusinessRouter);
  router.use('/business/event', eventBusinessRouter);
  router.use('/business/session', sessionRouter);
  router.use('/business', [businessRouter, businessAuthenticateRouter]);

  app.use('/api', router);
};
