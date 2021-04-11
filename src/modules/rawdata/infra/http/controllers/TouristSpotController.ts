import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTouristSpotService from '@modules/rawdata/services/touristSpot/CreateTouristSpotService';

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
}
