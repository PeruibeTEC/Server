import { Router } from 'express';

import TheftController from '../controllers/TheftController';

const theftRouter = Router();
const theftController = new TheftController();

theftRouter.post('/', theftController.create);
theftRouter.delete('/', theftController.delete);
theftRouter.get('/:id', theftController.show);
theftRouter.get('/', theftController.index);
theftRouter.put('/', theftController.update);

export default theftRouter;
