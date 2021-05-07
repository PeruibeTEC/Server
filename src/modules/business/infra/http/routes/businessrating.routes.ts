import { Router } from 'express';

import BusinessRatingController from '../controllers/BusinessRatingController';

const businessRatingRouter = Router();
const businessRatingController = new BusinessRatingController();

businessRatingRouter.post('/', businessRatingController.create);
businessRatingRouter.delete('/', businessRatingController.delete);
businessRatingRouter.put('/', businessRatingController.update);
businessRatingRouter.get('/:business_rating_id', businessRatingController.show);

export default businessRatingRouter;
