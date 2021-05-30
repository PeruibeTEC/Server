import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import TheftLocationController from '../controllers/TheftLocationController';

const theftLocationRouter = Router();
const theftLocationController = new TheftLocationController();

theftLocationRouter.use(ensureAuthenticate);

theftLocationRouter.post('/', theftLocationController.create);
theftLocationRouter.delete('/', theftLocationController.delete);
theftLocationRouter.get('/:theft_location_id', theftLocationController.show);
theftLocationRouter.get('/', theftLocationController.index);
theftLocationRouter.put('/', theftLocationController.update);

export default theftLocationRouter;
