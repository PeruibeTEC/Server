import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInterestPointTypeService from '@modules/rawdata/services/interestPointType/CreateInterestPointTypeService';
import ListInterestPointTypeService from '@modules/rawdata/services/interestPointType/ListInterestPointTypeService';

export default class InterestPointTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createInterestPointType = container.resolve(
      CreateInterestPointTypeService,
    );

    const interestPoint = await createInterestPointType.execute({
      name,
      description,
    });

    return response.json(interestPoint);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const interest_point_type_id: string = (request.params as unknown) as string;

    const listInterestPointType = container.resolve(
      ListInterestPointTypeService,
    );

    const interestPointTypes = await listInterestPointType.execute({
      interest_point_type_id,
    });

    return response.status(200).json(interestPointTypes);
  }
}
