import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTouristSpotPhotoService from '@modules/rawdata/services/touristSpotPhoto/CreateTouristSpotPhotoService';
import DeleteTouristSpotPhotoService from '@modules/rawdata/services/touristSpotPhoto/DeleteTouristSpotPhoto';
import ShowTouristSpotPhotosService from '@modules/rawdata/services/touristSpotPhoto/ShowTouristSpotPhotos';

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { tourist_spot_photo_id } = request.body;

    const deleteTouristPhotoSpot = container.resolve(
      DeleteTouristSpotPhotoService,
    );

    await deleteTouristPhotoSpot.execute({ tourist_spot_photo_id });

    return response.status(200).json({
      message: `Tourist Spot Photo for id ${tourist_spot_photo_id} deleted `,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const tourist_spot_id = request.body;

    const showTouristSpotPhotos = container.resolve(
      ShowTouristSpotPhotosService,
    );

    const touristSpotPhotos = await showTouristSpotPhotos.execute({
      tourist_spot_id,
    });

    return response.status(200).json({ touristSpotPhotos });
  }
}
