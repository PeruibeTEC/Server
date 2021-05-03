import { Router } from 'express';
import TouristSessionController from '../controllers/TouristSessionController';

const touristRouter = Router();
const touristSessionController = new TouristSessionController();

touristRouter.post('/', touristSessionController.create);

export default touristRouter;
