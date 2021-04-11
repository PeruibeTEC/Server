import { Router } from 'express';

import TouristSpotController from '../controllers/TouristSpotController';

const touristSpotRouter = Router();
const touristSpotController = new TouristSpotController();

touristSpotRouter.post('/', touristSpotController.create);
// touristSpotRouter.delete('/', touristSpotController.delete);
// touristSpotRouter.get('/:id', touristSpotController.show);
// touristSpotRouter.get('/', touristSpotController.index);
// touristSpotRouter.put('/', touristSpotController.update);

export default touristSpotRouter;
