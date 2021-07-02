|    Title     |         Description         |
| :----------: | :-------------------------: |
| Business DTO | Understanding Business DTOs |

The files on ./src/modules/business/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the IBusinessDTO.ts file:

```ts
export default interface IBusinessDTO {
  name: string;
  email_login: string;
  password: string;
  description?: string;
  profile_photo?: string;
  background_photo?: string;
  operating_time: Date;
  closing_time: Date;
  closing_day: string;
  business_type_id: string;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [IBusinessDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/dtos/IBusinessDTO.ts) on 07/01/2021._
