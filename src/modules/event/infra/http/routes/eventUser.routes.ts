import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import EventUserController from '../controllers/EventUserController';

const eventUserRouter = Router();
const eventUserController = new EventUserController();

eventUserRouter.get('/', eventUserController.index);
eventUserRouter.get('/:event_id', eventUserController.show);
eventUserRouter.post('/', ensureAuthenticate, eventUserController.create);
eventUserRouter.put(
  '/:event_id',
  ensureAuthenticate,
  eventUserController.update,
);
eventUserRouter.delete(
  '/:event_id',
  ensureAuthenticate,
  eventUserController.delete,
);

export default eventUserRouter;
