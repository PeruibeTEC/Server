import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTouristSpotService from '@modules/rawdata/services/touristSpot/CreateTouristSpotService';
import ShowTouristSpotService from '@modules/rawdata/services/touristSpot/ShowTouristSpotService';
import DeleteTouristSpotService from '@modules/rawdata/services/touristSpot/DeleteTouristSpotService';
import IndexTouristSpotService from '@modules/rawdata/services/touristSpot/IndexTouristSpotService';
import UpdateTouristSpotService from '@modules/rawdata/services/touristSpot/UpdateTouristSpotService';

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

  public async delete(request: Request, response: Response): Promise<Response> {
    const { tourist_spot_id } = request.body;

    const deleteTouristSpot = container.resolve(DeleteTouristSpotService);

    await deleteTouristSpot.execute({ tourist_spot_id });

    return response
      .status(200)
      .json({ message: `Tourist Spot for id ${tourist_spot_id} deleted ` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexTouristSpot = container.resolve(IndexTouristSpotService);

    const touristSpots = await indexTouristSpot.execute();

    return response.status(200).json(touristSpots);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      tourist_spot_id,
      name,
      description,
      latitude,
      longitude,
    } = request.body;

    const updateTouristSpot = container.resolve(UpdateTouristSpotService);

    const touristSpot = await updateTouristSpot.execute({
      tourist_spot_id,
      name,
      description,
      latitude,
      longitude,
    });

    return response.json(touristSpot);
  }
}
