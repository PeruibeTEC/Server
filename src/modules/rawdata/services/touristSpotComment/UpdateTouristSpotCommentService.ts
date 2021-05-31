import { inject, injectable } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import ITouristSpotCommentRepository from '@modules/rawdata/repositories/ITouristSpotCommentRepository';
import TouristSpotComment from '@modules/rawdata/infra/typeorm/entities/TouristSpotComment';

interface IRequest {
  content: string;
  tourist_spot_comment_id: string;
  user_id: string;
}

@injectable()
export default class UpdateTouristSpotCommentService {
  constructor(
    @inject('TouristSpotCommentRepository')
    private touristSpotCommentRepository: ITouristSpotCommentRepository,
  ) {}

  public async execute({
    content,
    tourist_spot_comment_id,
    user_id,
  }: IRequest): Promise<TouristSpotComment> {
    const touristSpotComment = await this.touristSpotCommentRepository.findById(
      tourist_spot_comment_id,
    );

    if (!touristSpotComment) {
      throw new AppError('Comment not found.', 404);
    }

    if (touristSpotComment.user_id !== user_id) {
      throw new AppError(
        'User does not have permission to update this comment.',
        403,
      );
    }

    Object.assign(touristSpotComment, { content });

    return this.touristSpotCommentRepository.save(touristSpotComment);
  }
}
