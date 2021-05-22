import { Router } from 'express';

import EventTypeBusinessController from '../../controllers/EventTypeBusinessController';

const eventTypeBusinessRouter = Router();
const eventTypeBusinessController = new EventTypeBusinessController();

eventTypeBusinessRouter.post('/', eventTypeBusinessController.create);
eventTypeBusinessRouter.delete('/', eventTypeBusinessController.delete);
eventTypeBusinessRouter.put('/', eventTypeBusinessController.update);
eventTypeBusinessRouter.get('/', eventTypeBusinessController.index);
eventTypeBusinessRouter.get(
  '/:event_type_business_id',
  eventTypeBusinessController.show,
);

export default eventTypeBusinessRouter;
