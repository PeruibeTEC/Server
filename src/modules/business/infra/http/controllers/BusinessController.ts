import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessService from '@modules/business/services/business/CreateBusinessService';
// import DeleteBusinessService from '@modules/business/services/business/DeleteBusinessService';
// import ShowBusinessService from '@modules/business/services/business/ShowBusinessService';
// import UpdateBusinessService from '@modules/business/services/business/UpdateBusinessService';
// import IndexBusinessService from '@modules/business/services/business/IndexBusinessService';

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

  /* public async delete(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;

    const deleteBusiness = container.resolve(DeleteBusinessService);

    await deleteBusiness.execute({ business_id });

    return response
      .status(200)
      .json({ message: `Business ${business_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;

    const showBusiness = container.resolve(ShowBusinessService);
    const business = await showBusiness.execute({ business_id });
    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.status(200).json(business);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;

    const listBusiness = container.resolve(IndexBusinessService);

    const businesss = await listBusiness.execute({
      business_id,
    });

    return response.status(200).json(businesss);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;

    const {
      name,
      email,
      password,
      old_password,
      small_biography,
    } = request.body;

    const updateBusiness = container.resolve(UpdateBusinessService);

    const business = await updateBusiness.execute({
      business_id,
      name,
      email,
      password,
      old_password,
      small_biography,
    });

    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.json(business);
  }
  */
}
