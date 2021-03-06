import { Router } from 'express';

import ensureAuthenticated from '@shared/infra/http/middlewares/ensureAuthenticate';

import BusinessRatingController from '../../controllers/BusinessRatingController';

const businessRatingRouter = Router();
const businessRatingController = new BusinessRatingController();

businessRatingRouter.use(ensureAuthenticated);

businessRatingRouter.get('/:business_id', businessRatingController.show);
businessRatingRouter.post('/', businessRatingController.create);
businessRatingRouter.delete('/', businessRatingController.delete);
businessRatingRouter.put('/', businessRatingController.update);

export default businessRatingRouter;
