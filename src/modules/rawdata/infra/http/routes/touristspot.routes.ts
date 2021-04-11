import { Router } from 'express';

import TouristSpotController from '../controllers/TouristSpotController';

const touristSpotRouter = Router();
const touristSpotController = new TouristSpotController();

touristSpotRouter.post('/', touristSpotController.create);
touristSpotRouter.get('/:id', touristSpotController.show);
touristSpotRouter.delete('/', touristSpotController.delete);
touristSpotRouter.get('/', touristSpotController.index);
touristSpotRouter.put('/', touristSpotController.update);

export default touristSpotRouter;
