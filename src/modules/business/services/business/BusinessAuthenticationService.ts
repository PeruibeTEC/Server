import { compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import auth from '@shared/infra/http/config/auth';
import AppError from '@shared/infra/http/errors/AppError';
import Business from '@modules/business/infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

interface IRequest {
  email_login: string;
  password: string;
}

interface IResponse {
  business: Business;
  token: string;
}

@injectable()
class AuthenticateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({
    email_login,
    password,
  }: IRequest): Promise<IResponse> {
    const business = await this.businessRepository.findByEmail(email_login);
    if (!business) {
      throw new AppError('Incorrect email combination', 401);
    }

    const passwordMatched = await compare(password, business.password);
    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const { business_secret, expiresIn } = auth.jwt;

    // veryfing if secret is undefined (otherwise the sign method won't work)
    if (business_secret === undefined) {
      throw new AppError('Invalid secret');
    } else {
      const token = sign({}, business_secret, {
        subject: business.id,
        expiresIn,
      });

      return {
        business,
        token,
      };
    }
  }
}

export default AuthenticateBusinessService;
