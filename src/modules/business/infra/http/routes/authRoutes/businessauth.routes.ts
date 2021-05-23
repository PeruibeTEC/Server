import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import BusinessController from '../../controllers/BusinessController';

const businessAuthRouter = Router();
const businessController = new BusinessController();

businessAuthRouter.use(ensureAuthenticateBusiness);

businessAuthRouter.delete('/', businessController.delete);
businessAuthRouter.put('/', businessController.update);

export default businessAuthRouter;
