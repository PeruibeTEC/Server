import { Router } from 'express';

import InterestPointTypeController from '../controllers/InterestPointTypeController';

const interestPointTypeRouter = Router();
const interestPointTypeController = new InterestPointTypeController();

interestPointTypeRouter.post('/', interestPointTypeController.create);
interestPointTypeRouter.get('/', interestPointTypeController.index);
interestPointTypeRouter.get('/:id', interestPointTypeController.show);
interestPointTypeRouter.delete('/', interestPointTypeController.delete);
interestPointTypeRouter.put('/', interestPointTypeController.update);

export default interestPointTypeRouter;
