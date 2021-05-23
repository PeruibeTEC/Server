import { Router } from 'express';

import BusinessProductController from '../../controllers/BusinessProductController';

const businessProductRouter = Router();
const businessProductController = new BusinessProductController();

businessProductRouter.get(
  '/:business_product_id',
  businessProductController.show,
);
businessProductRouter.get('/', businessProductController.indexByBusiness);

export default businessProductRouter;
