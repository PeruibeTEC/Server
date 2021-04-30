import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessLocationService from '@modules/business/services/businessLocation/CreateBusinessLocationService';
import DeleteBusinessLocationService from '@modules/business/services/businessLocation/DeleteBusinessLocationService';
import ShowBusinessLocationService from '@modules/business/services/businessLocation/ShowBusinessLocationService';
import UpdateBusinessLocationService from '@modules/business/services/businessLocation/UpdateBusinessLocationService';
import IndexBusinessLocationService from '@modules/business/services/businessLocation/IndexBusinessLocationService';

export default class BusinessLocationController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      district,
      latitude,
      longitude,
      description,
      business_id,
    } = request.body;

    const createBusinessLocation = container.resolve(
      CreateBusinessLocationService,
    );

    const businessLocation = await createBusinessLocation.execute({
      street,
      number,
      district,
      latitude,
      longitude,
      description,
      business_id,
    });

    return response.json(businessLocation);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { business_location_id } = request.body;

    const deleteBusinessLocationService = container.resolve(
      DeleteBusinessLocationService,
    );

    await deleteBusinessLocationService.execute({ business_location_id });

    return response
      .status(200)
      .json({ message: `BusinessLocation ${business_location_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_location_id } = request.body;

    const showBusinessLocation = container.resolve(ShowBusinessLocationService);
    const businessLocation = await showBusinessLocation.execute({
      business_location_id,
    });

    return response.status(200).json(businessLocation);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexBusinessLocationService = container.resolve(
      IndexBusinessLocationService,
    );

    const businessLocation = await indexBusinessLocationService.execute();

    return response.status(200).json(businessLocation);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      district,
      latitude,
      longitude,
      description,
      business_id,
      business_location_id,
    } = request.body;

    const updateBusinessLocationService = container.resolve(
      UpdateBusinessLocationService,
    );

    const businessLocation = await updateBusinessLocationService.execute({
      street,
      number,
      district,
      latitude,
      longitude,
      description,
      business_id,
      business_location_id,
    });

    return response.json(businessLocation);
  }
}
