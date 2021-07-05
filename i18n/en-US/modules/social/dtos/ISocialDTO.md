|   Title    |        Description        |
| :--------: | :-----------------------: |
| Social DTO | Understanding Social DTOs |

The files on ./src/modules/social/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the IPostDTO.ts file:

```ts
export default interface IPostDTO {
  content: string;
  has_photo: boolean;
  user_id: string;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [IPostDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/social/dtos/IPostDTO.ts) on 07/05/2021._
