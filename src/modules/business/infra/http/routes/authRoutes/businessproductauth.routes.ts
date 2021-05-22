import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import BusinessProductController from '../../controllers/BusinessProductController';

const businessProductAuthRouter = Router();
const businessProductController = new BusinessProductController();

businessProductAuthRouter.use(ensureAuthenticateBusiness);

businessProductAuthRouter.post('/', businessProductController.create);
businessProductAuthRouter.delete('/', businessProductController.delete);
businessProductAuthRouter.put('/', businessProductController.update);

export default businessProductAuthRouter;
