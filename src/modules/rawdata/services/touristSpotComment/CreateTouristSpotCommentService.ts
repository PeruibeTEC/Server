import { inject, injectable } from 'tsyringe';

import ITouristSpotCommentRepository from '@modules/rawdata/repositories/ITouristSpotCommentRepository';
import TouristSpotComment from '@modules/rawdata/infra/typeorm/entities/TouristSpotComment';

export interface IRequest {
  content: string;
  user_id: string;
  tourist_spot_id: string;
}

@injectable()
export default class CreateTouristSpotCommentService {
  constructor(
    @inject('TouristSpotCommentRepository')
    private touristSpotCommentRepository: ITouristSpotCommentRepository,
  ) {}

  public async execute({
    content,
    user_id,
    tourist_spot_id,
  }: IRequest): Promise<TouristSpotComment> {
    const touristSpotComment = this.touristSpotCommentRepository.create({
      content,
      user_id,
      tourist_spot_id,
    });

    return touristSpotComment;
  }
}
