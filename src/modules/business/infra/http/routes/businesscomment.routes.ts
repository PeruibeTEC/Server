import { Router } from 'express';

import BusinessCommentController from '../controllers/BusinessCommentController';

const businessCommentRouter = Router();
const businessCommentController = new BusinessCommentController();

businessCommentRouter.post('/', businessCommentController.create);
businessCommentRouter.delete('/', businessCommentController.delete);
businessCommentRouter.put('/', businessCommentController.update);
businessCommentRouter.get(
  '/:business_comment_id',
  businessCommentController.show,
);

export default businessCommentRouter;
