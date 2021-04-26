import { Router } from 'express';

import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import LikeController from '../controllers/LikeController';

const likeRouter = Router();
const likeController = new LikeController();

likeRouter.use(ensureAuthenticate);

likeRouter.post('/', likeController.create);
likeRouter.delete('/', likeController.delete);
likeRouter.get('/', likeController.index);

export default likeRouter;
