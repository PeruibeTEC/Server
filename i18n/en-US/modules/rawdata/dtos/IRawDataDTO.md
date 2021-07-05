|    Title     |         Description         |
| :----------: | :-------------------------: |
| Raw Data DTO | Understanding Raw Data DTOs |

The files on ./src/modules/rawdata/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the ITouristSpotDTO.ts file:

```ts
export default interface ITouristSpotDTO {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [ITouristSpotDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/rawdata/dtos/ITouristSpotDTO.ts) on 07/05/2021._
