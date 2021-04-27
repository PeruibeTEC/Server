import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import ProjectPhotoController from '../controllers/ProjectPhotoController';

const projectPhotoRouter = Router();
const projectPhotoController = new ProjectPhotoController();

projectPhotoRouter.use(ensureAuthenticate);

projectPhotoRouter.post('/', projectPhotoController.create);
projectPhotoRouter.delete('/', projectPhotoController.delete);
projectPhotoRouter.get('/', projectPhotoController.show);

export default projectPhotoRouter;
