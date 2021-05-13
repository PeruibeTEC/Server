import { Router } from 'express';

import BusinessCommentController from '../controllers/BusinessCommentController';

const businessCommentRouter = Router();
const businessCommentController = new BusinessCommentController();

businessCommentRouter.get(
  '/:business_id',
  businessCommentController.indexCommentByBusiness,
);
businessCommentRouter.post('/', businessCommentController.create);
businessCommentRouter.delete('/', businessCommentController.delete);
businessCommentRouter.put('/', businessCommentController.update);

export default businessCommentRouter;
