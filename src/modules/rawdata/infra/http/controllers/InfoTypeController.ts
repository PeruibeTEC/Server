import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInfoTypeService from '@modules/rawdata/services/infoType/CreateInfoTypeService';

export default class InfoTypeController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description } = request.body;

    const createInfoType = container.resolve(CreateInfoTypeService);

    const info = await createInfoType.execute({ name, description });

    return response.json(info);
  }
}
