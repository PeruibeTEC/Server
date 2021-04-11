import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTouristSpotService from '@modules/rawdata/services/touristSpot/CreateTouristSpotService';
import ShowTouristSpotService from '@modules/rawdata/services/touristSpot/ShowTouristSpotService';

export default class TouristSpotController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, latitude, longitude } = request.body;

    const createTouristSpotService = container.resolve(
      CreateTouristSpotService,
    );

    const touristSpot = await createTouristSpotService.execute({
      name,
      description,
      latitude,
      longitude,
    });

    return response.json(touristSpot);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const tourist_spot_id: string = (request.params as unknown) as string;

    const showTouristSpot = container.resolve(ShowTouristSpotService);

    const touristSpot = await showTouristSpot.execute({
      tourist_spot_id,
    });

    return response.status(200).json({ touristSpot });
  }
}
