import { Router } from 'express';

import UsersController from '../controllers/UserController';
import ensureAuthenticate from '../middlewares/ensureAuthenticate';

const profilesRouter = Router();
const usersController = new UsersController();

profilesRouter.use(ensureAuthenticate);

profilesRouter.get('/', usersController.show);
profilesRouter.put('/', usersController.update);
profilesRouter.delete('/', usersController.delete);

export default profilesRouter;
