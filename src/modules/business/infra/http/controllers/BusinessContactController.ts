import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessContactService from '@modules/business/services/businessContact/CreateBusinessContactService';
import DeleteBusinessContactService from '@modules/business/services/businessContact/DeleteBusinessContactService';
import ShowBusinessContactService from '@modules/business/services/businessContact/ShowBusinessContactService';
import UpdateBusinessContactService from '@modules/business/services/businessContact/UpdateBusinessContactService';
import IndexBusinessContactService from '@modules/business/services/businessContact/IndexBusinessContactService';

export default class BusinessContactController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { contact_email, cellphone, tellphone, business_id } = request.body;

    const createBusinessContact = container.resolve(
      CreateBusinessContactService,
    );

    const business = await createBusinessContact.execute({
      contact_email,
      cellphone,
      tellphone,
      business_id,
    });

    return response.json(business);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { business_contact_id } = request.body;

    const deleteBusinessContactService = container.resolve(
      DeleteBusinessContactService,
    );

    await deleteBusinessContactService.execute({ business_contact_id });

    return response
      .status(200)
      .json({ message: `BusinessContact ${business_contact_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_id } = request.body;

    const showBusinessContact = container.resolve(ShowBusinessContactService);
    const business = await showBusinessContact.execute({ business_id });

    return response.status(200).json(business);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const indexBusinessContactService = container.resolve(
      IndexBusinessContactService,
    );

    const businessContact = await indexBusinessContactService.execute();

    return response.status(200).json(businessContact);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      contact_email,
      cellphone,
      tellphone,
      business_contact_id,
    } = request.body;

    const updateBusinessContactService = container.resolve(
      UpdateBusinessContactService,
    );

    const business = await updateBusinessContactService.execute({
      contact_email,
      cellphone,
      tellphone,
      business_contact_id,
    });

    return response.json(business);
  }
}
