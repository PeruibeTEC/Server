import { Router } from 'express';
import ProfileUserController from '../controllers/ProfileUserController';
import UsersController from '../controllers/UserController';

const usersRouter = Router();
const usersController = new UsersController();
const profileController = new ProfileUserController();

usersRouter.post('/', usersController.create);
usersRouter.get('/', usersController.index);
usersRouter.get('/:id', profileController.show);

export default usersRouter;
