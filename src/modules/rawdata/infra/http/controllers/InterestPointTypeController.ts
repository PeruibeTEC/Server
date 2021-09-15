import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInterestPointTypeService from '@modules/rawdata/services/interestPointType/CreateInterestPointTypeService';
import IndexInterestPointTypeService from '@modules/rawdata/services/interestPointType/IndexInterestPointTypeService';
import ShowInterestPointTypeService from '@modules/rawdata/services/interestPointType/ShowInterestPointTypeService';
import DeleteInterestPointTypeService from '@modules/rawdata/services/interestPointType/DeleteInterestPointTypeService';
import UpdateInterestPointTypeService from '@modules/rawdata/services/interestPointType/UpdateInterestPointTypeService';
import logger from '@shared/utils/logger';

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
    const listInterestPointType = container.resolve(
      IndexInterestPointTypeService,
    );

    const interestPointTypes = await listInterestPointType.execute();

    return response.status(200).json(interestPointTypes);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const interest_point_type_id: string = request.params as unknown as string;

    const showInterestPointType = container.resolve(
      ShowInterestPointTypeService,
    );

    const interestPoint = await showInterestPointType.execute({
      interest_point_type_id,
    });

    return response.status(200).json({ interestPoint });
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { interest_point_type_id } = request.body;

    const deleteInterestPoint = container.resolve(
      DeleteInterestPointTypeService,
    );

    await deleteInterestPoint.execute({ interest_point_type_id });

    logger.info(`Interest Point Type for id ${interest_point_type_id} deleted`);

    return response.status(200).json({
      message: `Interest Point Type for id ${interest_point_type_id} deleted `,
    });
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { interest_point_type_id, name, description } = request.body;

    const updateInterestPointType = container.resolve(
      UpdateInterestPointTypeService,
    );

    const interestPointType = await updateInterestPointType.execute({
      interest_point_type_id,
      name,
      description,
    });

    logger.info(
      `Interest Point Type for id ${interest_point_type_id} has updated`,
    );

    return response.json(interestPointType);
  }
}
