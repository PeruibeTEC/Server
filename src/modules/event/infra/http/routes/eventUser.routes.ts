import { Router } from 'express';

import EventUserController from '../controllers/EventUserController';

const eventUserRouter = Router();
const eventUserController = new EventUserController();

eventUserRouter.get('/', eventUserController.index);
eventUserRouter.get('/:event_id', eventUserController.show);
eventUserRouter.post('/', eventUserController.create);

export default eventUserRouter;
