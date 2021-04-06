import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInterestPointService from '@modules/rawdata/services/interestPoint/CreateInterestPointService';
import DeleteInterestPointService from '@modules/rawdata/services/interestPoint/DeleteInterestPointService';
import ShowInterestPointService from '@modules/rawdata/services/interestPoint/ShowInterestPointService';
import ListInterestPointService from '@modules/rawdata/services/interestPoint/ListInterestPointService';

export default class InterestPointController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      telephone,
      street,
      number,
      district,
      interest_point_type_id,
    } = request.body;

    const createInterestPoint = container.resolve(CreateInterestPointService);

    const interestPoint = await createInterestPoint.execute({
      name,
      telephone,
      street,
      number,
      district,
      interest_point_type_id,
    });

    return response.json(interestPoint);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const deleteInterestPoint = container.resolve(DeleteInterestPointService);

    await deleteInterestPoint.execute({ name });

    return response.status(200).json({ message: `Number ${name} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const interest_point_id: string = (request.params as unknown) as string;

    const showInterestPoint = container.resolve(ShowInterestPointService);

    const interestPoint = await showInterestPoint.execute({
      interest_point_id,
    });

    return response.status(200).json({ interestPoint });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const interest_point_id: string = (request.params as unknown) as string;

    const listInterestPoint = container.resolve(ListInterestPointService);

    const interestPoints = await listInterestPoint.execute({
      interest_point_id,
    });

    return response.status(200).json(interestPoints);
  }
}
