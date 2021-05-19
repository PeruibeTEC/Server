import { Router } from 'express';

import ensureAuthenticated from '@modules/user/infra/http/middlewares/ensureAuthenticate';

import BusinessCommentController from '../controllers/BusinessCommentController';

const businessCommentRouter = Router();
const businessCommentController = new BusinessCommentController();

businessCommentRouter.use(ensureAuthenticated);

businessCommentRouter.get(
  '/:business_id',
  businessCommentController.indexCommentByBusiness,
);
businessCommentRouter.post('/', businessCommentController.create);
businessCommentRouter.delete('/', businessCommentController.delete);
businessCommentRouter.put('/', businessCommentController.update);

export default businessCommentRouter;
