import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import TouristSpotRatingController from '../controllers/TouristSpotRatingController';

const touristSpotRatingRouter = Router();
const touristSpotRatingController = new TouristSpotRatingController();

touristSpotRatingRouter.use(ensureAuthenticated);

touristSpotRatingRouter.get('/', touristSpotRatingController.show);
touristSpotRatingRouter.post('/', touristSpotRatingController.create);
touristSpotRatingRouter.delete('/', touristSpotRatingController.delete);

export default touristSpotRatingRouter;
