import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInfoService from '@modules/rawdata/services/info/CreateInfoService';
import DeleteInfoService from '@modules/rawdata/services/info/DeleteInfoService';
import ShowInfoService from '@modules/rawdata/services/info/ShowInfoService';

export default class InfoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { telephone, info_address_id, info_type_id } = request.body;

    const createInfo = container.resolve(CreateInfoService);

    const info = await createInfo.execute({
      telephone,
      info_address_id,
      info_type_id,
    });

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

  public async show(request: Request, response: Response): Promise<Response> {
    const info_id: string = (request.params as unknown) as string;

    const showInfo = container.resolve(ShowInfoService);

    const info = await showInfo.execute({ info_id });

    return response.status(200).json({ info });
  }
}
