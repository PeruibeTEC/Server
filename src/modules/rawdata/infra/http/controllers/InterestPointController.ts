import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInterestPointService from '@modules/rawdata/services/interestPoint/CreateInterestPointService';
import DeleteInterestPointService from '@modules/rawdata/services/interestPoint/DeleteInterestPointService';
import ShowInterestPointService from '@modules/rawdata/services/interestPoint/ShowInterestPointService';
import IndexInterestPointService from '@modules/rawdata/services/interestPoint/IndexInterestPointService';
import UpdateInterestPointService from '@modules/rawdata/services/interestPoint/UpdateInterestPointService';
import logger from '@shared/utils/logger';

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
    const { interest_point_id } = request.body;

    const deleteInterestPoint = container.resolve(DeleteInterestPointService);

    await deleteInterestPoint.execute({ interest_point_id });

    logger.info(`Interest Point for id ${interest_point_id} deleted`);

    return response
      .status(200)
      .json({ message: `Interest Point for id ${interest_point_id} deleted` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const interest_point_id: string = request.params as unknown as string;

    const showInterestPoint = container.resolve(ShowInterestPointService);

    const interestPoint = await showInterestPoint.execute({
      interest_point_id,
    });

    return response.status(200).json({ interestPoint });
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listInterestPoint = container.resolve(IndexInterestPointService);

    const interestPoints = await listInterestPoint.execute();

    return response.status(200).json(interestPoints);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      interest_point_id,
      interest_point_type_id,
      name,
      street,
      district,
      number,
      telephone,
    } = request.body;

    const updateInterestPoint = container.resolve(UpdateInterestPointService);

    const interestPoint = await updateInterestPoint.execute({
      interest_point_id,
      interest_point_type_id,
      name,
      street,
      district,
      number,
      telephone,
    });

    logger.info(`Interest Point for id ${interest_point_id} has updated`);

    return response.json(interestPoint);
  }
}
