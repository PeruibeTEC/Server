import { Router } from 'express';

import UsersController from '../controllers/UserController';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const profilesRouter = Router();
const usersController = new UsersController();

profilesRouter.get('/', usersController.show, ensureAuthenticate);
profilesRouter.put('/', usersController.update, ensureAuthenticate);

export default profilesRouter;
