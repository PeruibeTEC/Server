import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import TheftItemsController from '../controllers/TheftItemsController';

const theftItemsRouter = Router();
const theftItemsController = new TheftItemsController();

theftItemsRouter.use(ensureAuthenticate);

theftItemsRouter.post('/', theftItemsController.create);
theftItemsRouter.delete('/', theftItemsController.delete);
theftItemsRouter.get('/:id', theftItemsController.show);
theftItemsRouter.get('/', theftItemsController.index);
theftItemsRouter.put('/', theftItemsController.update);

export default theftItemsRouter;
