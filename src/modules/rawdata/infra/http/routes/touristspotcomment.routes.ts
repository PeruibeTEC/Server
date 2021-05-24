import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import TouristSpotCommentController from '../controllers/TouristSpotCommentController';

const touristSpotCommentRouter = Router();
const touristSpotCommentController = new TouristSpotCommentController();

touristSpotCommentRouter.use(ensureAuthenticated);

touristSpotCommentRouter.post('/', touristSpotCommentController.create);

export default touristSpotCommentRouter;
