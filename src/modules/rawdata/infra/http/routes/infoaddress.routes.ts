import { Router } from 'express';

import InfoAddressController from '../controllers/InfoAddressController';

const infoAddressRouter = Router();
const infoAddressController = new InfoAddressController();

infoAddressRouter.post('/', infoAddressController.create);

export default infoAddressRouter;
