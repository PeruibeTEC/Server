|   Title   |       Description        |
| :-------: | :----------------------: |
| Event DTO | Understanding Event DTOs |

The files on ./src/modules/event/dtos/ make sure that the type of data going on Entities are correct.

## Purpose

By doing this, we can have an idea of what type of data goes where, and even using this as a basis on later IRepository files. Here is an example from the IEventUserDTO.ts file:

```ts
export default interface IEventUserDTO {
  name: string;
  date: Date;
  start_time: Date;
  end_time: Date;
  description: string;
  user_id: string;
  event_type_id: string;
}
```

Here it is clear which data has what type. Note that some places we use this syntax `<variable>?: <type>;`, making it possible to this value to be null.

_This code snippet was taken from [IEventUserDTO.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/event/dtos/IEventUserDTO.ts) on 07/01/2021._
