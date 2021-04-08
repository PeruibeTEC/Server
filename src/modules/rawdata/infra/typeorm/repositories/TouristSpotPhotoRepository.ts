import { getRepository, Repository } from 'typeorm';

import ITouristSpotPhotoRepository from '@modules/rawdata/repositories/ITouristSpotPhotoRepository';
import ITouristSpotPhotoDTO from '@modules/rawdata/dtos/ITouristSpotPhotoDTO';

import TouristSpotPhoto from '../entities/TouristSpotPhoto';

export default class TouristSpotPhotoRepository
  implements ITouristSpotPhotoRepository {
  private ormRepository: Repository<TouristSpotPhoto>;

  constructor() {
    this.ormRepository = getRepository(TouristSpotPhoto);
  }

  public async findByInterestPoint(
    interestPointId: string,
  ): Promise<TouristSpotPhoto | undefined> {
    const touristSpotPhoto = await this.ormRepository.findOne({
      where: { tourist_spot_id: interestPointId },
    });

    return touristSpotPhoto;
  }

  public async findById(id: string): Promise<TouristSpotPhoto | undefined> {
    const touristSpotPhoto = await this.ormRepository.findOne(id);

    return touristSpotPhoto;
  }

  public async create(
    infoData: ITouristSpotPhotoDTO,
  ): Promise<TouristSpotPhoto> {
    const touristSpotPhoto = this.ormRepository.create(infoData);

    await this.ormRepository.save(touristSpotPhoto);

    return touristSpotPhoto;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `touristSpotPhoto_id: ${id} deleted`;
  }

  public async save(
    touristSpotPhoto: TouristSpotPhoto,
  ): Promise<TouristSpotPhoto> {
    return this.ormRepository.save(touristSpotPhoto);
  }
}
