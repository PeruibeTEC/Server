import { Router } from 'express';

import BusinessContactController from '../../controllers/BusinessContactController';

const businessContactRouter = Router();
const businessContactController = new BusinessContactController();

businessContactRouter.get('/:business_id', businessContactController.show);
businessContactRouter.get('/', businessContactController.index);

export default businessContactRouter;
