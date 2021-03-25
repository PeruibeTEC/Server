import { Request, Response } from 'express';

import { container } from 'tsyringe';

import ResetPasswordService from '@modules/user/services/ResetPasswordService';

export default class ResetPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { token, new_password } = request.body;

    const resetPasswordService = container.resolve(ResetPasswordService);

    await resetPasswordService.execute({ token, new_password });

    return response.status(200).json();
  }
}
