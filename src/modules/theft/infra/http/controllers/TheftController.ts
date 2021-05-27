import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTheftService from '@modules/theft/services/theft/CreateTheftService';
import DeleteTheftService from '@modules/theft/services/theft/DeleteTheftService';
import ShowTheftService from '@modules/theft/services/theft/ShowTheftService';
import IndexTheftService from '@modules/theft/services/theft/IndexTheftService';
import UpdateTheftService from '@modules/theft/services/theft/UpdateTheftService';

export default class TheftController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      date,
      time,
      description,
      title,
      theft_location_id,
      user_id,
    } = request.body;

    const createTheft = container.resolve(CreateTheftService);

    const theft = await createTheft.execute({
      date,
      time,
      description,
      title,
      theft_location_id,
      user_id,
    });

    return response.json(theft);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { theft_id } = request.body;

    const deleteTheft = container.resolve(DeleteTheftService);

    await deleteTheft.execute({ theft_id, user_id });

    return response.status(200).json({
      message: `Theft id ${theft_id} deleted `,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const theft_id = request.body;

    const showTheft = container.resolve(ShowTheftService);

    const theft = await showTheft.execute({
      theft_id,
    });

    return response.status(200).json({ theft });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexTheft = container.resolve(IndexTheftService);

    const thefts = await indexTheft.execute();

    return response.status(200).json(thefts);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const {
      theft_id,
      date,
      time,
      description,
      title,
      theft_location_id,
    } = request.body;

    const updateTheft = container.resolve(UpdateTheftService);

    const theft = await updateTheft.execute({
      theft_id,
      date,
      time,
      description,
      title,
      theft_location_id,
      user_id,
    });

    return response.json(theft);
  }
}
