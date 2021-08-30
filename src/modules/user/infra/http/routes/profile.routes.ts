import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import ProfileUserController from '../controllers/ProfileUserController';

const profilesRouter = Router();
const profileController = new ProfileUserController();

profilesRouter.use(ensureAuthenticate);

profilesRouter.get('/:id', profileController.show);

export default profilesRouter;
