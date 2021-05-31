import { inject, injectable } from 'tsyringe';

import ITouristSpotCommentRepository from '@modules/rawdata/repositories/ITouristSpotCommentRepository';
import TouristSpotComment from '@modules/rawdata/infra/typeorm/entities/TouristSpotComment';

@injectable()
export default class IndexTouristSpotCommentService {
  constructor(
    @inject('TouristSpotCommentRepository')
    private touristSpotCommentRepository: ITouristSpotCommentRepository,
  ) {}

  public async execute(
    tourist_spot_id: string,
  ): Promise<TouristSpotComment[] | undefined> {
    const touristSpotComment = this.touristSpotCommentRepository.findAllByTouristSpot(
      tourist_spot_id,
    );

    return touristSpotComment;
  }
}
