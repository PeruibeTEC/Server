import { getRepository, Repository } from 'typeorm';

import ITouristSpotCommentRepository from '@modules/rawdata/repositories/ITouristSpotCommentRepository';
import ITouristSpotCommentDTO from '@modules/rawdata/dtos/ITouristSpotCommentDTO';
import TouristSpotComment from '../entities/TouristSpotComment';

export default class TouristSpotCommentRepository
  implements ITouristSpotCommentRepository {
  private ormRepository: Repository<TouristSpotComment>;

  constructor() {
    this.ormRepository = getRepository(TouristSpotComment);
  }

  public async findAllByTouristSpot(
    tourist_spot_id: string,
  ): Promise<TouristSpotComment[] | undefined> {
    const touristSpotComment = await this.ormRepository.find({
      where: { tourist_spot_id },
    });

    return touristSpotComment;
  }

  public async create(
    touristSpotCommentData: ITouristSpotCommentDTO,
  ): Promise<TouristSpotComment> {
    const touristSpotComment = this.ormRepository.create(
      touristSpotCommentData,
    );

    await this.ormRepository.save(touristSpotCommentData);

    return touristSpotComment;
  }
}
