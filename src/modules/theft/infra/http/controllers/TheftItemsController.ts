import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateTheftItemsService from '@modules/theft/services/theftItems/CreateTheftItemsService';
import DeleteTheftItemsService from '@modules/theft/services/theftItems/DeleteTheftItemsService';
import ShowTheftItemsService from '@modules/theft/services/theftItems/ShowTheftItemsService';
import IndexTheftItemsService from '@modules/theft/services/theftItems/IndexTheftItemsService';
import UpdateTheftItemsService from '@modules/theft/services/theftItems/UpdateTheftItemsService';

export default class TheftItemsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { theft_id, amount, items } = request.body;

    const createTheftItems = container.resolve(CreateTheftItemsService);

    const theft = await createTheftItems.execute({
      theft_id,
      amount,
      items,
    });

    return response.json(theft);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { theft_items_id } = request.body;

    const deleteTheftItems = container.resolve(DeleteTheftItemsService);

    await deleteTheftItems.execute({ theft_items_id });

    return response.status(200).json({
      message: `Items id ${theft_items_id} deleted `,
    });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const theft_items_id = request.body;

    const showTheftItems = container.resolve(ShowTheftItemsService);

    const theftItems = await showTheftItems.execute({
      theft_items_id,
    });

    return response.status(200).json({ theftItems });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexTheftItems = container.resolve(IndexTheftItemsService);

    const theftItems = await indexTheftItems.execute();

    return response.status(200).json(theftItems);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { theft_items_id, theft_id, amount, items } = request.body;

    const updateTheftItems = container.resolve(UpdateTheftItemsService);

    const theft = await updateTheftItems.execute({
      theft_items_id,
      theft_id,
      amount,
      items,
    });

    return response.json(theft);
  }
}
