import { Router } from 'express';

import BusinessRatingController from '../controllers/BusinessRatingController';

const businessRatingRouter = Router();
const businessRatingController = new BusinessRatingController();

businessRatingRouter.get('/average', businessRatingController.showAverage);
businessRatingRouter.get('/business', businessRatingController.showBusiness);
businessRatingRouter.get('/user', businessRatingController.showUser);
businessRatingRouter.post('/', businessRatingController.create);
businessRatingRouter.delete('/', businessRatingController.delete);
businessRatingRouter.put('/', businessRatingController.update);

export default businessRatingRouter;
