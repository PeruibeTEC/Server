import { Router } from 'express';

import EventBusinessController from '../controllers/EventBusinessController';

const eventBusinessRouter = Router();
const eventBusinessController = new EventBusinessController();

eventBusinessRouter.post('/', eventBusinessController.create);
eventBusinessRouter.delete('/', eventBusinessController.delete);
eventBusinessRouter.get('/', eventBusinessController.index);
eventBusinessRouter.get('/:event_business_id', eventBusinessController.show);
eventBusinessRouter.put('/', eventBusinessController.update);

export default eventBusinessRouter;
