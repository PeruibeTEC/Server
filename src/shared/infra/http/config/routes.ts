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


import theftRouter from '@modules/theft/infra/http/routes/theft.routes';
import theftLocationRouter from '@modules/theft/infra/http/routes/theftlocation.routes';
import theftItemsRouter from '@modules/theft/infra/http/routes/theftitems.routes';

import businessTypeRouter from '@modules/business/infra/http/routes/commonRoutes/businesstype.routes';
import businessRouter from '@modules/business/infra/http/routes/commonRoutes/business.routes';
import businessAuthRouter from '@modules/business/infra/http/routes/authRoutes/businessauth.routes';
import businessContactRouter from '@modules/business/infra/http/routes/commonRoutes/businesscontact.routes';
import businessContactAuthRouter from '@modules/business/infra/http/routes/authRoutes/businesscontactauth.routes';
import businessLocationRouter from '@modules/business/infra/http/routes/commonRoutes/businesslocation.routes';
import businessLocationAuthRouter from '@modules/business/infra/http/routes/authRoutes/businesslocationauth.routes';
import businessProductRouter from '@modules/business/infra/http/routes/commonRoutes/businessproduct.routes';
import businessProductAuthRouter from '@modules/business/infra/http/routes/authRoutes/businessproductauth.routes';
import eventBusinessRouter from '@modules/business/infra/http/routes/commonRoutes/eventbusiness.routes';
import eventBusinessAuthRouter from '@modules/business/infra/http/routes/authRoutes/eventbusinessauth.routes';
import businessRatingRouter from '@modules/business/infra/http/routes/authRoutes/businessratingauth.routes';
import businessCommentRouter from '@modules/business/infra/http/routes/authRoutes/businesscommentauth.routes';
import eventTypeBusinessRouter from '@modules/business/infra/http/routes/commonRoutes/eventtypebusiness.routes';
import sessionRouter from '@modules/business/infra/http/routes/session.routes';


export default (app: Express): void => {
  const router = Router();

  // always put especific routes first, and generic routes later
  // e.g: '/a/b' needs to come first and '/a' later

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

  router.use('/project/comment', projectCommentRouter);
  router.use('/project/photo', projectPhotoRouter);
  router.use('/project', projectRouter);


  router.use('/theft/items', theftItemsRouter);
  router.use('/theft/location', theftLocationRouter);
  router.use('/theft', theftRouter);

  router.use('/business/type', businessTypeRouter);
  router.use('/business/contact', [
    businessContactRouter,
    businessContactAuthRouter,
  ]);
  router.use('/business/location', [
    businessLocationRouter,
    businessLocationAuthRouter,
  ]);
  router.use('/business/product', [
    businessProductRouter,
    businessProductAuthRouter,
  ]);
  router.use('/business/event', [eventBusinessRouter, eventBusinessAuthRouter]);
  router.use('/business/rating', businessRatingRouter);
  router.use('/business/comment', businessCommentRouter);
  router.use('/business/eventtype', eventTypeBusinessRouter);
  router.use('/business/session', sessionRouter);
  router.use('/business', [businessRouter, businessAuthRouter]);

  app.use('/api', router);
};
