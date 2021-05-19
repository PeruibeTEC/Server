<<<<<<< HEAD
import ensureAuthenticate from '@modules/user/infra/http/middlewares/ensureAuthenticate';
import { Router } from 'express';
=======
import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
>>>>>>> main
import ProjectController from '../controllers/ProjectController';

const projectRouter = Router();
const projectController = new ProjectController();

projectRouter.use(ensureAuthenticate);

projectRouter.post('/', projectController.create);
projectRouter.delete('/', projectController.delete);
projectRouter.get('/:id', projectController.show);
projectRouter.get('/', projectController.index);
projectRouter.put('/', projectController.update);

export default projectRouter;
