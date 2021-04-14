import { Router } from 'express';

import TouristSpotPhotoController from '../controllers/TouristSpotPhotoController';

const touristSpotPhotoRouter = Router();
const touristSpotPhotoController = new TouristSpotPhotoController();

touristSpotPhotoRouter.post('/', touristSpotPhotoController.create);
touristSpotPhotoRouter.delete('/', touristSpotPhotoController.delete);
touristSpotPhotoRouter.get('/', touristSpotPhotoController.show);

export default touristSpotPhotoRouter;
