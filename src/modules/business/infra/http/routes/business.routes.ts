import { Router } from 'express';

import BusinessController from '../controllers/BusinessController';

const businessRouter = Router();
const businessController = new BusinessController();

businessRouter.post('/', businessController.create);
businessRouter.delete('/', businessController.delete);
businessRouter.put('/', businessController.update);
businessRouter.get('/', businessController.show);
businessRouter.get('/', businessController.index);

export default businessRouter;
