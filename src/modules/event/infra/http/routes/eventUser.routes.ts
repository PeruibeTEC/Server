import { Router } from 'express';

import EventUserController from '../controllers/EventUserController';

const eventUserRouter = Router();
const eventUserController = new EventUserController();

eventUserRouter.get('/', eventUserController.index);

export default eventUserRouter;
