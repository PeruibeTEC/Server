import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInfoService from '@modules/rawdata/services/info/CreateInfoService';
import DeleteInfoService from '@modules/rawdata/services/info/DeleteInfoService';

export default class InfoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { telephone } = request.body;

    const createInfo = container.resolve(CreateInfoService);

    const info = await createInfo.execute({ telephone });

    return response.json(info);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { telephone } = request.body;

    const deleteInfo = container.resolve(DeleteInfoService);

    await deleteInfo.execute({ telephone });

    return response
      .status(200)
      .json({ message: `Number ${telephone} deleted ` });
  }
}
