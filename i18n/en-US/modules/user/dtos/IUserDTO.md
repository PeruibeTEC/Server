|  Title   |       Description       |
| :------: | :---------------------: |
| User DTO | Understanding User DTOs |

The files on ./src/modules/user/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the IUserDTO.ts file:

```ts
export default interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  small_biography?: string;
  photo?: string;
  background_photo?: string;
  is_tourist: boolean;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [IUserDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/user/dtos/IUserDTO.ts) on 07/05/2021._
