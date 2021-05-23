import { Router } from 'express';

import BusinessLocationController from '../../controllers/BusinessLocationController';

const businessLocationRouter = Router();
const businessLocationController = new BusinessLocationController();

businessLocationRouter.put('/', businessLocationController.update);
businessLocationRouter.get('/:business_id', businessLocationController.show);

export default businessLocationRouter;
