import { Router } from 'express';

import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import PhotoPostController from '../controllers/PhotoPostController';

const photoPostRouter = Router();
const photoPostController = new PhotoPostController();

photoPostRouter.use(ensureAuthenticate);

photoPostRouter.post('/', photoPostController.create);
photoPostRouter.delete('/', photoPostController.delete);
photoPostRouter.get('/', photoPostController.show);

export default photoPostRouter;
