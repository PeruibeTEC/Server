import { Router } from 'express';

import EventUserController from '../controllers/EventUserController';

const eventUserRouter = Router();
const eventUserController = new EventUserController();

eventUserRouter.get('/', eventUserController.index);
eventUserRouter.get('/:event_id', eventUserController.show);
eventUserRouter.post('/', eventUserController.create);
eventUserRouter.put('/:event_id', eventUserController.update);
eventUserRouter.delete('/:event_id', eventUserController.delete);

export default eventUserRouter;
