import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import BusinessController from '../controllers/BusinessController';

const businessAuthenticateRouter = Router();
const businessController = new BusinessController();

businessAuthenticateRouter.use(ensureAuthenticateBusiness);

businessAuthenticateRouter.delete('/', businessController.delete);
businessAuthenticateRouter.put('/', businessController.update);

export default businessAuthenticateRouter;
