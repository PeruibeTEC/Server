import { Router } from 'express';

import UsersController from '../controllers/UserController';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.delete('/', usersController.delete, ensureAuthenticate);
usersRouter.get('/', usersController.index, ensureAuthenticate);

export default usersRouter;
