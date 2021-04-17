import { Router } from 'express';

import EventTypeUserController from '../controllers/EventTypeUserController';

const eventTypeUserRouter = Router();
const eventTypeUserController = new EventTypeUserController();

eventTypeUserRouter.get('/', eventTypeUserController.index);
eventTypeUserRouter.get('/:event_type_id', eventTypeUserController.show);
eventTypeUserRouter.post('/', eventTypeUserController.create);

export default eventTypeUserRouter;
