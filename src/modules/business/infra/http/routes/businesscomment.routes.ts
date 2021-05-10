import { Router } from 'express';

import BusinessCommentController from '../controllers/BusinessCommentController';

const businessCommentRouter = Router();
const businessCommentController = new BusinessCommentController();

businessCommentRouter.get('/user', businessCommentController.showUser);
businessCommentRouter.get('/business', businessCommentController.showBusiness);
businessCommentRouter.post('/', businessCommentController.create);
businessCommentRouter.delete('/', businessCommentController.delete);
businessCommentRouter.put('/', businessCommentController.update);

export default businessCommentRouter;
