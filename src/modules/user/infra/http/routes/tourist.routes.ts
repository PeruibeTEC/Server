import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
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
