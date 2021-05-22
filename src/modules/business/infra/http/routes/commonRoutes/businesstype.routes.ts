import { Router } from 'express';

import BusinessTypeController from '../../controllers/BusinessTypeController';

const businessTypeRouter = Router();
const businessTypeController = new BusinessTypeController();

businessTypeRouter.post('/', businessTypeController.create);
businessTypeRouter.delete('/', businessTypeController.delete);
businessTypeRouter.put('/', businessTypeController.update);
businessTypeRouter.get('/', businessTypeController.index);
businessTypeRouter.get('/:business_type_id', businessTypeController.show);

export default businessTypeRouter;
