import { Router } from 'express';

import InfoController from '../controllers/InfoController';

const infoRouter = Router();
const infoController = new InfoController();

infoRouter.post('/', infoController.create);
infoRouter.delete('/', infoController.delete);
infoRouter.get('/:id', infoController.show);

export default infoRouter;
