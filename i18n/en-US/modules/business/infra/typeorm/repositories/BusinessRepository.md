|        Title        |             Description             |
| :-----------------: | :---------------------------------: |
| Business Repository | Understanding Business Repositories |

The files on ./src/modules/business/infra/typeorm/repositories are responsible for creating methods to access, update and even delete entries in the database.

## Purpose

By doing this, we can have a cleaner code, because the code that would normally go directly on the controllers is here. The following example is from the BusinessRepository.ts file:

```ts
import { getRepository, Repository } from 'typeorm';

import IBusinessRepository from '@modules/business/repositories/IBusinessRepository';
import IBusinessDTO from '@modules/business/dtos/IBusinessDTO';

import Business from '../entities/Business';

export default class BusinessRepository implements IBusinessRepository {
  private ormRepository: Repository<Business>;

  constructor() {
    this.ormRepository = getRepository(Business);
  }

  public async findById(id: string): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne(id);

    return business;
  }

  public async findByName(name: string): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne({
      where: { name },
    });

    return business;
  }

  public async findByEmail(email_login: string): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne({
      where: { email_login },
    });

    return business;
  }

  public async findAllBusiness(): Promise<Business[]> {
    const business = await this.ormRepository.find();

    return business;
  }

  public async create(businessData: IBusinessDTO): Promise<Business> {
    const business = this.ormRepository.create(businessData);

    await this.ormRepository.save(business);

    return business;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Business_id: ${id} deleted`;
  }

  public async save(business: Business): Promise<Business> {
    return this.ormRepository.save(business);
  }
}
```

Making the code this way is easier to read and follow, because every function is precisely in one method. Some important aspects are:

```ts
import { getRepository, Repository } from 'typeorm';

import IBusinessRepository from '@modules/business/repositories/IBusinessRepository';
import IBusinessDTO from '@modules/business/dtos/IBusinessDTO';

import Business from '../entities/Business';
```

First we import `{ getRepository, Repository }` from typeorm, then we import the interface for the repository (IBusinessRepository) and the DTO. After that we import the entity and we are ready to go:

```ts
export default class <NameRepository> implements <INameRepository> {
  private ormRepository: Repository<<Entity>>;

  constructor() {
    this.ormRepository = getRepository(<Entity>);
  }
```

Here we use the default class and the constructor to create the proper repository and to link it to the interface.

```ts
  public async findById(id: string): Promise<Business | undefined> {
    const business = await this.ormRepository.findOne(id);

    return business;
  }

  public async findAllBusiness(): Promise<Business[]> {
    const business = await this.ormRepository.find();

    return business;
  }

  public async create(businessData: IBusinessDTO): Promise<Business> {
    const business = this.ormRepository.create(businessData);

    await this.ormRepository.save(business);

    return business;
  }

  public async delete(id: string): Promise<string> {
    await this.ormRepository.delete(id);

    return `Business_id: ${id} deleted`;
  }

  public async save(business: Business): Promise<Business> {
    return this.ormRepository.save(business);
  }
}
```

The basic structure of a Repository is this: firstly we create a findById method, that searches the database based on an given Id. If necessary, we can find more specific values (such as emails, names, etc.). After that is the findAllBusiness, that is necessary for the index service, and returns an array. Then we have create, delete and save. Create uses data given by the business, delete uses an authentication to permit its use, and save is used for updating the database.

_This code snippet was taken from [BusinessRepository.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/repositories/BusinessRepository.ts) on 07/20/2021._
