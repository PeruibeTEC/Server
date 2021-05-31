import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotCommentRepository from '@modules/rawdata/repositories/ITouristSpotCommentRepository';

interface IRequest {
  tourist_spot_comment_id: string;
  user_id: string;
}

@injectable()
export default class DeleteTouristSpotCommentService {
  constructor(
    @inject('TouristSpotCommentRepository')
    private touristSpotCommentRepository: ITouristSpotCommentRepository,
  ) {}

  public async execute({
    tourist_spot_comment_id,
    user_id,
  }: IRequest): Promise<void> {
    const touristSpotComment = await this.touristSpotCommentRepository.findById(
      tourist_spot_comment_id,
    );

    if (!touristSpotComment) {
      throw new AppError('Comment not found.', 404);
    }

    if (touristSpotComment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to delete this comment.',
        403,
      );
    }

    await this.touristSpotCommentRepository.delete(tourist_spot_comment_id);
  }
}
