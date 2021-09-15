import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTheftLocationService from '@modules/theft/services/theftLocation/CreateTheftLocationService';
import DeleteTheftLocationService from '@modules/theft/services/theftLocation/DeleteTheftLocationService';
import ShowTheftLocationService from '@modules/theft/services/theftLocation/ShowTheftLocationService';
import IndexTheftLocationService from '@modules/theft/services/theftLocation/IndexTheftLocationService';
import UpdateTheftLocationService from '@modules/theft/services/theftLocation/UpdateTheftLocationService';
import logger from '@shared/utils/logger';

export default class TheftLocationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { street, number, district, latitude, longitude } = request.body;

    const createTheftLocation = container.resolve(CreateTheftLocationService);

    const theftLocation = await createTheftLocation.execute({
      street,
      number,
      district,
      latitude,
      longitude,
    });

    return response.json(theftLocation);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { theft_location_id } = request.body;

    const deleteTheftLocation = container.resolve(DeleteTheftLocationService);

    await deleteTheftLocation.execute({ theft_location_id });

    logger.info(`Location for id: ${theft_location_id} deleted`);

    return response.status(200).json({
      message: `Location for id: ${theft_location_id} deleted`,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { theft_location_id } = request.params;

    const showTheftLocation = container.resolve(ShowTheftLocationService);

    const theftLocation = await showTheftLocation.execute({
      theft_location_id,
    });

    return response.status(200).json(theftLocation);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { district } = request.body;

    const indexTheftLocation = container.resolve(IndexTheftLocationService);

    const theftLocation = await indexTheftLocation.execute({ district });

    return response.status(200).json(theftLocation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { number, street, district, latitude, longitude, theft_location_id } =
      request.body;

    const updateTheftLocation = container.resolve(UpdateTheftLocationService);

    const theftLocation = await updateTheftLocation.execute({
      number,
      street,
      district,
      latitude,
      longitude,
      theft_location_id,
    });

    logger.info(`Location for id: ${theft_location_id} has updated`);

    return response.json(theftLocation);
  }
}
