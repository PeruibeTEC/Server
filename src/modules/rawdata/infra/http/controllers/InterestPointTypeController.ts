import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInterestPointTypeService from '@modules/rawdata/services/interestPointType/CreateInterestPointTypeService';

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
}
