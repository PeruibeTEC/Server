import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateInfoAddressService from '@modules/rawdata/services/infoAddress/CreateInfoAddressService';

export default class InfoAddressController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { street, number, district } = request.body;

    const createInfo = container.resolve(CreateInfoAddressService);

    const info = await createInfo.execute({ street, number, district });

    return response.json(info);
  }
}
