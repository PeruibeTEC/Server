|   Title   |       Description        |
| :-------: | :----------------------: |
| Theft DTO | Understanding Theft DTOs |

The files on ./src/modules/theft/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the ITheftDTO.ts file:

```ts
export default interface ITheftDTO {
  date: Date;
  time?: Date;
  description?: string;
  title: string;
  theft_location_id: string;
  user_id: string;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [ITheftDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/theft/dtos/ITheftDTO.ts) on 07/05/2021._
