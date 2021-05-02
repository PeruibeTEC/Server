import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessProductService from '@modules/business/services/businessProduct/CreateBusinessProductService';
import DeleteBusinessProductService from '@modules/business/services/businessProduct/DeleteBusinessProductService';
import ShowBusinessProductService from '@modules/business/services/businessProduct/ShowBusinessProductService';
import UpdateBusinessProductService from '@modules/business/services/businessProduct/UpdateBusinessProductService';
import IndexBusinessProductService from '@modules/business/services/businessProduct/IndexBusinessProductService';

export default class BusinessProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, price, url, business_id } = request.body;

    const createBusinessProduct = container.resolve(
      CreateBusinessProductService,
    );

    const business = await createBusinessProduct.execute({
      name,
      description,
      price,
      url,
      business_id,
    });

    return response.json(business);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { business_product_id } = request.body;

    const deleteBusinessProductService = container.resolve(
      DeleteBusinessProductService,
    );

    await deleteBusinessProductService.execute({ business_product_id });

    return response
      .status(200)
      .json({ message: `BusinessProduct ${business_product_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_product_id } = request.body;

    const showBusinessProduct = container.resolve(ShowBusinessProductService);
    const businessProduct = await showBusinessProduct.execute({
      business_product_id,
    });

    return response.status(200).json(businessProduct);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexBusinessProductService = container.resolve(
      IndexBusinessProductService,
    );

    const businessProduct = await indexBusinessProductService.execute();

    return response.status(200).json(businessProduct);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, description, price, url, business_product_id } = request.body;

    const updateBusinessProductService = container.resolve(
      UpdateBusinessProductService,
    );

    const businessProduct = await updateBusinessProductService.execute({
      name,
      description,
      price,
      url,
      business_product_id,
    });

    return response.json(businessProduct);
  }
}
