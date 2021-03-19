import { Router } from 'express';

import UsersController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create);
usersRouter.delete('/:id', usersController.delete);
usersRouter.get('/:id', usersController.show);

export default usersRouter;
