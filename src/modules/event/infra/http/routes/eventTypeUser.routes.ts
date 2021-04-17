import { Router } from 'express';

import EventTypeUserController from '../controllers/EventTypeUserController';

const eventTypeUserRouter = Router();
const eventTypeUserController = new EventTypeUserController();

eventTypeUserRouter.get('/', eventTypeUserController.index);

export default eventTypeUserRouter;
