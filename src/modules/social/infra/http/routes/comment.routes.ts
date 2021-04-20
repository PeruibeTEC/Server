import { Router } from 'express';

import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import CommentController from '../controllers/CommentController';

const commentRouter = Router();
const commentController = new CommentController();

commentRouter.use(ensureAuthenticate);

commentRouter.post('/', commentController.create);
commentRouter.delete('/', commentController.delete);
commentRouter.get('/', commentController.index);
commentRouter.put('/', commentController.update);

export default commentRouter;
