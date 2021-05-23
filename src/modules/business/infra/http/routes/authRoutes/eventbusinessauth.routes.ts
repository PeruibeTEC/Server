import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import EventBusinessController from '../../controllers/EventBusinessController';

const eventBusinessAuthRouter = Router();
const eventBusinessController = new EventBusinessController();

eventBusinessAuthRouter.use(ensureAuthenticateBusiness);

eventBusinessAuthRouter.post('/', eventBusinessController.create);
eventBusinessAuthRouter.delete('/', eventBusinessController.delete);
eventBusinessAuthRouter.put('/', eventBusinessController.update);

export default eventBusinessAuthRouter;
