import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateBusinessCommentService from '@modules/business/services/businessComment/CreateBusinessCommentService';
import DeleteBusinessCommentService from '@modules/business/services/businessComment/DeleteBusinessCommentService';
import ShowBusinessCommentService from '@modules/business/services/businessComment/ShowBusinessCommentService';
import UpdateBusinessCommentService from '@modules/business/services/businessComment/UpdateBusinessCommentService';

export default class BusinessCommentController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { content, user_id, business_id } = request.body;

    const createBusinessComment = container.resolve(
      CreateBusinessCommentService,
    );

    const business = await createBusinessComment.execute({
      content,
      user_id,
      business_id,
    });

    return response.json(business);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { business_comment_id } = request.body;

    const deleteBusinessCommentService = container.resolve(
      DeleteBusinessCommentService,
    );

    await deleteBusinessCommentService.execute({ business_comment_id });

    return response
      .status(200)
      .json({ message: `Comment ${business_comment_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { business_comment_id } = request.body;

    const showBusinessComment = container.resolve(ShowBusinessCommentService);
    const businessComment = await showBusinessComment.execute({
      business_comment_id,
    });

    return response.status(200).json(businessComment);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { content, business_comment_id } = request.body;

    const updateBusinessCommentService = container.resolve(
      UpdateBusinessCommentService,
    );

    const business = await updateBusinessCommentService.execute({
      content,
      business_comment_id,
    });

    return response.json(business);
  }
}
