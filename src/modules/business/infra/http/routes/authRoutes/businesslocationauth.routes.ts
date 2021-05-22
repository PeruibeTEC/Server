import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import BusinessLocationController from '../../controllers/BusinessLocationController';

const businessLocationAuthRouter = Router();
const businessLocationController = new BusinessLocationController();

businessLocationAuthRouter.use(ensureAuthenticateBusiness);

businessLocationAuthRouter.post('/', businessLocationController.create);
businessLocationAuthRouter.delete('/', businessLocationController.delete);
businessLocationAuthRouter.put('/', businessLocationController.update);

export default businessLocationAuthRouter;
