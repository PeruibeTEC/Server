import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import PostController from '../controllers/PostController';

const postRouter = Router();
const postController = new PostController();

postRouter.use(ensureAuthenticate);

postRouter.post('/', postController.create);
postRouter.delete('/', postController.delete);
postRouter.get('/', postController.index);
postRouter.put('/', postController.update);

export default postRouter;
