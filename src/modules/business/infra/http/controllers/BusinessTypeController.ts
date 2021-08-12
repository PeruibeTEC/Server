import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessTypeService from '@modules/business/services/businessType/CreateBusinessTypeService';
import DeleteBusinessTypeService from '@modules/business/services/businessType/DeleteBusinessTypeService';
import IndexBusinessTypeService from '@modules/business/services/businessType/IndexBusinessTypeService';
import ShowBusinessTypeService from '@modules/business/services/businessType/ShowBusinessTypeService';
import UpdateBusinessTypeService from '@modules/business/services/businessType/UpdateBusinessTypeService';

export default class BusinessTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createBusinessTypeService = container.resolve(
      CreateBusinessTypeService,
    );

    const businessType = await createBusinessTypeService.execute({
      name,
    });

    return response.status(201).json(businessType);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { business_type_id } = request.body;

    const deleteBusinessTypeService = container.resolve(
      DeleteBusinessTypeService,
    );

    await deleteBusinessTypeService.execute({ business_type_id });

    return response
      .status(200)
      .json({ message: `Post for id ${business_type_id} deleted ` });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexBusinessTypeService = container.resolve(
      IndexBusinessTypeService,
    );

    const businessTypes = await indexBusinessTypeService.execute();

    return response.status(200).json(businessTypes);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { business_type_id, name } = request.body;

    const updateBusinessTypeService = container.resolve(
      UpdateBusinessTypeService,
    );

    const businessType = await updateBusinessTypeService.execute({
      business_type_id,
      name,
    });

    return response.json(businessType);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_type_id } = request.params;

    const showBusinessTypeService = container.resolve(ShowBusinessTypeService);

    const businessType = await showBusinessTypeService.execute({
      business_type_id,
    });

    return response.json(businessType);
  }
}
