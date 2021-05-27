import { getRepository, Repository } from 'typeorm';

import ITokenRepository from '@modules/user/repositories/ITokenRepository';

import UserToken from '@modules/user/infra/typeorm/entities/UserToken';

class UserTokensRepository implements ITokenRepository {
  // to do: apply dependency injection
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}

export default UserTokensRepository;
