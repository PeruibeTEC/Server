import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInfoService from '@modules/rawdata/services/CreateInfoService';

export default class InfoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { telephone } = request.body;

    const createInfo = container.resolve(CreateInfoService);

    const info = await createInfo.execute({ telephone });

    return response.json(info);
  }
}
