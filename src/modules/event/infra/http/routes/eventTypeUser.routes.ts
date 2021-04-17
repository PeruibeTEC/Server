import { Router } from 'express';

import EventTypeUserController from '../controllers/EventTypeUserController';

const eventTypeUserRouter = Router();
const eventTypeUserController = new EventTypeUserController();

eventTypeUserRouter.get('/', eventTypeUserController.index);
eventTypeUserRouter.get('/:event_type_id', eventTypeUserController.show);
eventTypeUserRouter.post('/', eventTypeUserController.create);
eventTypeUserRouter.put('/:event_type_id', eventTypeUserController.update);
eventTypeUserRouter.delete('/:event_type_id', eventTypeUserController.delete);

export default eventTypeUserRouter;
