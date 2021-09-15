import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateTouristService from '@modules/user/services/Tourist/CreateTouristService';
import DeleteTouristService from '@modules/user/services/Tourist/DeleteTouristService';
import IndexTouristService from '@modules/user/services/Tourist/IndexTouristService';
import ShowTouristService from '@modules/user/services/Tourist/ShowTouristService';
import UpdateTouristService from '@modules/user/services/Tourist/UpdateTouristService';
import logger from '@shared/utils/logger';

export default class TouristController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { state, city, is_foreigner, country_foreigner } = request.body;
    const user_id = request.user.id;

    const createTourist = container.resolve(CreateTouristService);

    const tourist = await createTourist.execute({
      state,
      city,
      is_foreigner,
      country_foreigner,
      user_id,
    });

    return response.json(tourist);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { tourist_id } = request.body;

    const deleteTourist = container.resolve(DeleteTouristService);

    await deleteTourist.execute({ tourist_id });

    logger.info(`Tourist for id: ${tourist_id} deleted`);

    return response
      .status(200)
      .json({ message: `Tourist for id: ${tourist_id} deleted` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { tourist_id } = request.params;

    const showTourist = container.resolve(ShowTouristService);
    const tourist = await showTourist.execute({ tourist_id });

    return response.status(200).json(tourist);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexTourist = container.resolve(IndexTouristService);

    const tourists = await indexTourist.execute();

    return response.status(200).json(tourists);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { tourist_id, state, city, is_foreigner, country_foreigner } =
      request.body;
    const user_id = request.user.id;

    const updateTourist = container.resolve(UpdateTouristService);

    const tourist = await updateTourist.execute({
      tourist_id,
      state,
      city,
      is_foreigner,
      country_foreigner,
      user_id,
    });

    logger.info(`Tourist for id: ${tourist_id} has updated`);

    return response.json(tourist);
  }
}
