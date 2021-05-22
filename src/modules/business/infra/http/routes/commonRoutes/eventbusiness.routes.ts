import { Router } from 'express';

import EventBusinessController from '../../controllers/EventBusinessController';

const eventBusinessRouter = Router();
const eventBusinessController = new EventBusinessController();

eventBusinessRouter.get('/', eventBusinessController.index);
eventBusinessRouter.get('/:event_business_id', eventBusinessController.show);

export default eventBusinessRouter;
