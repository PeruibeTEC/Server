import { Router } from 'express';

import BusinessContactController from '../controllers/BusinessContactController';

const businessContactRouter = Router();
const businessContactController = new BusinessContactController();

businessContactRouter.post('/', businessContactController.create);
businessContactRouter.delete('/', businessContactController.delete);
businessContactRouter.put('/', businessContactController.update);
businessContactRouter.get(
  '/:business_contact_id',
  businessContactController.show,
);
businessContactRouter.get('/', businessContactController.index);

export default businessContactRouter;
