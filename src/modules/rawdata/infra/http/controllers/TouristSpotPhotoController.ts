import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTouristSpotPhotoService from '@modules/rawdata/services/touristSpotPhoto/CreateTouristSpotPhotoService';

export default class TouristSpotPhotoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { url, tourist_spot_id } = request.body;

    const createTouristSpotPhotoService = container.resolve(
      CreateTouristSpotPhotoService,
    );

    const touristSpotPhoto = await createTouristSpotPhotoService.execute({
      tourist_spot_id,
      url,
    });

    return response.json(touristSpotPhoto);
  }
}
