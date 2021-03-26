import { Router } from 'express';

import InterestPointController from '../controllers/InterestPointController';

const interestPointRouter = Router();
const interestPointController = new InterestPointController();

interestPointRouter.post('/', interestPointController.create);
interestPointRouter.delete('/', interestPointController.delete);
interestPointRouter.get('/:id', interestPointController.show);

export default interestPointRouter;
