import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessService from '@modules/business/services/business/CreateBusinessService';
import DeleteBusinessService from '@modules/business/services/business/DeleteBusinessService';
import ShowBusinessService from '@modules/business/services/business/ShowBusinessService';
import UpdateBusinessService from '@modules/business/services/business/UpdateBusinessService';
import IndexBusinessService from '@modules/business/services/business/IndexBusinessService';

export default class BusinessController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email_login,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    } = request.body;

    const createBusiness = container.resolve(CreateBusinessService);

    const business = await createBusiness.execute({
      name,
      email_login,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    });

    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.json(business);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;

    const deleteBusinessService = container.resolve(DeleteBusinessService);

    await deleteBusinessService.execute({ business_id });

    return response
      .status(200)
      .json({ message: `Business ${business_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_id } = request.params;

    const showBusiness = container.resolve(ShowBusinessService);
    const business = await showBusiness.execute({ business_id });
    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.status(200).json(business);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexBusinessService = container.resolve(IndexBusinessService);

    const business = await indexBusinessService.execute();

    return response.status(200).json(business);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;
    const {
      name,
      email_login,
      old_password,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    } = request.body;

    const updateBusinessService = container.resolve(UpdateBusinessService);

    const business = await updateBusinessService.execute({
      name,
      email_login,
      old_password,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
      business_id,
    });

    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.json(business);
  }
}
