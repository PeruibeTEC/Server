import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import EventTypeUserController from '../controllers/EventTypeUserController';

const eventTypeUserRouter = Router();
const eventTypeUserController = new EventTypeUserController();

eventTypeUserRouter.use(ensureAuthenticate);

eventTypeUserRouter.get('/', eventTypeUserController.index);
eventTypeUserRouter.get('/', eventTypeUserController.show);
eventTypeUserRouter.post('/', eventTypeUserController.create);
eventTypeUserRouter.put('/', eventTypeUserController.update);
eventTypeUserRouter.delete('/', eventTypeUserController.delete);

export default eventTypeUserRouter;
