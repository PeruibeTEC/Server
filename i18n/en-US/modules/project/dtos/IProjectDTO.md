|    Title    |        Description         |
| :---------: | :------------------------: |
| Project DTO | Understanding Project DTOs |

The files on ./src/modules/project/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the IProjectDTO.ts file:

```ts
export default interface IProjectDTO {
  name: string;
  street?: string;
  district?: string;
  latitude: number;
  longitude: number;
  starting_date: Date;
  ending_date: Date;
  description?: string;
  price: number;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [IProjectDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/project/dtos/IProjectDTO.ts) on 07/01/2021._
