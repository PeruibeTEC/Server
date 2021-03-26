import { Router } from 'express';

import InterestPointTypeController from '../controllers/InterestPointTypeController';

const interestPointTypeRouter = Router();
const interestPointTypeController = new InterestPointTypeController();

interestPointTypeRouter.post('/', interestPointTypeController.create);

export default interestPointTypeRouter;
