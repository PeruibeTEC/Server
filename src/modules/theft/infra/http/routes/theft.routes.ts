import { Router } from 'express';

import ensureAuthenticate from '@shared/infra/http/middlewares/ensureAuthenticate';
import TheftController from '../controllers/TheftController';

const theftRouter = Router();
const theftController = new TheftController();

theftRouter.use(ensureAuthenticate);

theftRouter.post('/', theftController.create);
theftRouter.delete('/', theftController.delete);
theftRouter.get('/:theft_id', theftController.show);
theftRouter.get('/', theftController.index);
theftRouter.patch('/', theftController.update);

export default theftRouter;
