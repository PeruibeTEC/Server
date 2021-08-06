|       Title       |           Description           |
| :---------------: | :-----------------------------: |
| Business Services | Understanding Business Services |

The files on ./src/modules/business/services can create, delete, update and show data from the database. While some services are specific, almost all of them follow these basis.

## Purpose

By doing this, we can alter the database data while also knowing what we are exactly doing. The services created here serve as methods on the controllers, so have a cleaner code. To learn more about controllers, go to [BusinessControllers](https://github.com/PeruibeTEC/Server/blob/main/i18n/en-US/modules/infra/http/controllers/BusinessControllers.md). Here are some examples from the business folder:

## Create Service

```ts
import { injectable, inject } from 'tsyringe';

import { azureCreate } from '@shared/infra/azure/imageStorage/imageUpload';

import AppError from '@shared/infra/http/errors/AppError';

import IHashProvider from '@shared/providers/HashProvider/models/IHashProvider';
import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

export interface IRequest {
  name: string;
  email_login: string;
  password: string;
  description: string;
  profile_photo: string;
  background_photo: string;
  operating_time: Date;
  closing_time: Date;
  closing_day: string;
  business_type_id: string;
}

@injectable()
export default class CreateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email_login,
    password,
    description,
    profile_photo,
    background_photo,
    operating_time,
    closing_time,
    closing_day,
    business_type_id,
  }: IRequest): Promise<Business> {
    const checkBusinessExists = await this.businessRepository.findByName(name);

    if (checkBusinessExists) {
      throw new AppError('Business already exists.', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    if (profile_photo === undefined) {
      profile_photo =
        'https://peruibetec.blob.core.windows.net/business-images/default.jpg';
    } else {
      profile_photo = azureCreate('business-images', profile_photo);
    }
    background_photo = azureCreate('business-images', background_photo);

    const business = this.businessRepository.create({
      name,
      email_login,
      password: hashedPassword,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    });

    return business;
  }
}
```

The create service takes info from the business using IRepository methods. It then checks to see any duplicates, and finally executes.

Note that this particular service has creates hashes for passwords with HashProvider and use specific photo links with Azure.

## Delete Service

```ts
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import IBusinessRepository from '../../repositories/IBusinessRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class DeleteBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({ business_id }: IRequest): Promise<void> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    if (business.id !== business_id) {
      throw new AppError(
        'Business does not have permission to delete this business.',
        403,
      );
    }

    await this.businessRepository.delete(business_id);
  }
}
```

The delete service requests an id (usually using session), and checks for permission. Being that granted, the entry is deleted.

## Show Service

```ts
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';
import averageRatingFunction from '@shared/utils/averageRatingFunction';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';
import IBusinessRatingRepository from '../../repositories/IBusinessRatingRepository';

interface IRequest {
  business_id: string;
}

@injectable()
export default class IndexBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,

    @inject('BusinessRatingRepository')
    private businessRatingRepository: IBusinessRatingRepository,
  ) {}

  public async execute({
    business_id,
  }: IRequest): Promise<Business | undefined> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    const averageRating = await this.businessRatingRepository.findAllValues(
      business_id,
    );

    const finalArray = averageRating?.map(obj => {
      return obj.value;
    });

    const averageRatingValue = averageRatingFunction(finalArray);

    Object.assign(business, { averageRatingValue });
    return business;
  }
}
```

The show service returns a single value from the database, based on an unique column. When a entry is found, it is returned.

In this specific case we also attach an averageRatingFunction to the value that will be returned. To see how it works, go to the [averageRatingFunction](https://github.com/PeruibeTEC/Server/blob/main/i18n/en-US/shared/utils/averageRatingFunction.md) file.

## Index Service

```ts
import { injectable, inject } from 'tsyringe';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

@injectable()
export default class IndexBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute(): Promise<Business[]> {
    const business = await this.businessRepository.findAllBusiness();

    return business;
  }
}
```

The index service does the same thing as the show service, but instead of returning a single value, it returns all values.

## Update Service

```ts
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/infra/http/errors/AppError';

import Business from '../../infra/typeorm/entities/Business';
import IBusinessRepository from '../../repositories/IBusinessRepository';

interface IRequest {
  name: string;
  email_login: string;
  old_password?: string;
  password?: string;
  description: string;
  profile_photo: string;
  background_photo: string;
  operating_time: Date;
  closing_time: Date;
  closing_day: string;
  business_type_id: string;
  business_id: string;
}

@injectable()
export default class UpdateBusinessService {
  constructor(
    @inject('BusinessRepository')
    private businessRepository: IBusinessRepository,
  ) {}

  public async execute({
    name,
    email_login,
    old_password,
    password,
    description,
    profile_photo,
    background_photo,
    operating_time,
    closing_time,
    closing_day,
    business_type_id,
    business_id,
  }: IRequest): Promise<Business> {
    const business = await this.businessRepository.findById(business_id);

    if (!business) {
      throw new AppError('Business not found.', 404);
    }

    if (business.id !== business_id) {
      throw new AppError(
        'Business does not have permission to update this business.',
        403,
      );
    }

    Object.assign(business, {
      name,
      email_login,
      old_password,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
      business_id,
    });

    return this.businessRepository.save(business);
  }
}
```

The update service requests info from the business by an IRequest, and tries to find a match between the given id and a database entry. It also tests the permission to change and beign that granted, executes.

## Specific Services

```ts
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
```

This service is used to authenticate and create JWT tokens. By using it we can create sessions and make sure that a business' data is safe.

As a general rule, all files have the imports at the top, importing from from dependencies such as azureCreate, hashProvider or even tsyringe. After that we import the entity and it's respective IRepository (To see how an IRepository works, click [here](https://github.com/PeruibeTEC/Server/blob/main/i18n/en-US/modules/business/repositories/IBusinessRepository.md)), and inject it in the service. As we can see, all services work on the "execute" method and most do some sort of testing.

_These codes snippets were taken from [CreateBusinessService.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts), [DeleteBusinessService.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts), [UpdateBusinessService.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts), [ShowBusinessService.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts), [IndexBusinessService.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts) and [BusinessAuthenticationService.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/entities/Business.ts), on 07/13/2021._
