import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import EventUserController from '../controllers/EventUserController';

const eventUserRouter = Router();
const eventUserController = new EventUserController();

eventUserRouter.use(ensureAuthenticate);

eventUserRouter.get('/', eventUserController.index);
eventUserRouter.get('/', eventUserController.show);
eventUserRouter.get('/user_events', eventUserController.indexUserEvents);
eventUserRouter.post('/', eventUserController.create);
eventUserRouter.put('/:event_id', eventUserController.update);
eventUserRouter.delete('/:event_id', eventUserController.delete);

export default eventUserRouter;
