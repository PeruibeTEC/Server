import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import TouristController from '../controllers/TouristController';

const touristRouter = Router();
const touristController = new TouristController();

touristRouter.use(ensureAuthenticate);

touristRouter.post('/', touristController.create);
touristRouter.delete('/', touristController.delete);
touristRouter.get('/:id', touristController.show);
touristRouter.get('/', touristController.index);
touristRouter.put('/', touristController.update);

export default touristRouter;
