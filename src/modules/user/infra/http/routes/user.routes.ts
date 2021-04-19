import { Router } from 'express';

import UsersController from '../controllers/UserController';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.use(ensureAuthenticate);
usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.index);

export default usersRouter;
