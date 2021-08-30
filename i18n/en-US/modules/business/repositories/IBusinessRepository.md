|        Title         |             Description              |
| :------------------: | :----------------------------------: |
| IBusiness Repository | Understanding IBusiness Repositories |

The files on ./src/modules/business/repositories are responsible for creating an interface for all methods used by the controllers. The code that goes behind this interface is located at [BusinessRepository.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/typeorm/repositories/BusinessRepository.ts).

## Purpose

By doing this, we can have a cleaner code, because the code that would normally go directly on the controllers is here. The following example is from the IBusinessRepository.ts file:

```ts
import Business from '../infra/typeorm/entities/Business';
import IBusinessDTO from '../dtos/IBusinessDTO';

export default interface IBusinessRepository {
  findAllBusiness(): Promise<Business[]>;
  findById(id: string): Promise<Business | undefined>;
  findByName(name: string): Promise<Business | undefined>;
  findByEmail(email_login: string): Promise<Business | undefined>;
  create(data: IBusinessDTO): Promise<Business>;
  delete(id: string): Promise<string>;
  save(business: Business): Promise<Business>;
}
```

As we can see, it is a simple code. You first import the entity and the DTO, then you export an interface named IBusinessRepository. After that you list all methods used by that repository. They usually all have a findAll, findById, create, delete and save method by default, but more methods can be added according to need. Something to note is that some methods receive certain parameters, such as ids or create, and they have specific return types, being a single type (Business), an array or even undefined.

_This code snippet was taken from [IBusinessRepository.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/repositories/IBusinessRepository.ts) on 08/24/2021._
