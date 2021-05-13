import { Router } from 'express';

import BusinessLocationController from '../controllers/BusinessLocationController';

const businessLocationRouter = Router();
const businessLocationController = new BusinessLocationController();

businessLocationRouter.post('/', businessLocationController.create);
businessLocationRouter.delete('/', businessLocationController.delete);
businessLocationRouter.put('/', businessLocationController.update);
businessLocationRouter.get('/:business_id', businessLocationController.show);
businessLocationRouter.get('/', businessLocationController.index);

export default businessLocationRouter;
