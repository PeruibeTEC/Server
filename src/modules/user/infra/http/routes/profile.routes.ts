import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import UsersController from '../controllers/UserController';

const profilesRouter = Router();
const usersController = new UsersController();

profilesRouter.use(ensureAuthenticate);

profilesRouter.get('/', usersController.show);
profilesRouter.put('/', usersController.update);
profilesRouter.delete('/', usersController.delete);

export default profilesRouter;
