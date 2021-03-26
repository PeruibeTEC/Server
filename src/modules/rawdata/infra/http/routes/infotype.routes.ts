import { Router } from 'express';

import InfoTypeController from '../controllers/InfoTypeController';

const infoTypeRouter = Router();
const infoTypeController = new InfoTypeController();

infoTypeRouter.post('/', infoTypeController.create);

export default infoTypeRouter;
