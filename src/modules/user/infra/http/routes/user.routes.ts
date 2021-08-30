import { Router } from 'express';

import UsersController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/:id', usersController.show);
usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.index);
usersRouter.put('/', usersController.update);
usersRouter.delete('/', usersController.delete);

export default usersRouter;
