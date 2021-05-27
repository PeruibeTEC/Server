import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import BusinessContactController from '../../controllers/BusinessContactController';

const businessContactAuthRouter = Router();
const businessContactController = new BusinessContactController();

businessContactAuthRouter.use(ensureAuthenticateBusiness);

businessContactAuthRouter.post('/', businessContactController.create);
businessContactAuthRouter.delete('/', businessContactController.delete);
businessContactAuthRouter.put('/', businessContactController.update);

export default businessContactAuthRouter;
