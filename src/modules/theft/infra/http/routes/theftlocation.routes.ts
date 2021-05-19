import { Router } from 'express';

import TheftLocationController from '../controllers/TheftLocationController';

const theftLocationRouter = Router();
const theftLocationController = new TheftLocationController();

theftLocationRouter.post('/', theftLocationController.create);
theftLocationRouter.delete('/', theftLocationController.delete);
theftLocationRouter.get('/:theft_location_id', theftLocationController.show);
theftLocationRouter.get('/', theftLocationController.index);
theftLocationRouter.put('/', theftLocationController.update);

export default theftLocationRouter;
