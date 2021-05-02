import { Router } from 'express';

import BusinessProductController from '../controllers/BusinessProductController';

const businessProductRouter = Router();
const businessProductController = new BusinessProductController();

businessProductRouter.post('/', businessProductController.create);
businessProductRouter.delete('/', businessProductController.delete);
businessProductRouter.put('/', businessProductController.update);
businessProductRouter.get(
  '/:business_product_id',
  businessProductController.show,
);
businessProductRouter.get('/', businessProductController.index);

export default businessProductRouter;
