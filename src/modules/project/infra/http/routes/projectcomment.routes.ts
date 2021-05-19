<<<<<<< HEAD
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
=======
import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
>>>>>>> main
import ProjectCommentController from '../controllers/ProjectCommentController';

const projectCommentRouter = Router();
const projectCommentController = new ProjectCommentController();

projectCommentRouter.use(ensureAuthenticate);

projectCommentRouter.post('/', projectCommentController.create);
projectCommentRouter.delete('/', projectCommentController.delete);
projectCommentRouter.get('/', projectCommentController.index);
projectCommentRouter.put('/', projectCommentController.update);

export default projectCommentRouter;
