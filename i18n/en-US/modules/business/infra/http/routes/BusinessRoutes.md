|      Title      |          Description          |
| :-------------: | :---------------------------: |
| Business Routes | Understanding Business Routes |

The files on ./src/modules/business/infra/http/routes are responsible for creating the routes that the application will use.

## Purpose

By doing this, we can connect our database with our app, and pass data by it.
Before we do some examples, we need to understand the session route and what it means in the code.

## Session Route

```ts
import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionsRouter = Router();
const sessionsController = new SessionController();

sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
```

So, as we can see, this route is used to create the session, and it is this that makes it possible to authenticate our routes while users use it, so we can have authRoutes and commonRoutes.

## authRoutes Example

```ts
import { Router } from 'express';

import ensureAuthenticateBusiness from '@modules/user/infra/http/middlewares/ensureAuthenticateBusiness';

import BusinessController from '../../controllers/BusinessController';

const businessAuthRouter = Router();
const businessController = new BusinessController();

businessAuthRouter.use(ensureAuthenticateBusiness);

businessAuthRouter.delete('/', businessController.delete);
businessAuthRouter.put('/', businessController.update);

export default businessAuthRouter;
```

Here we have an authRoute from the Business. Since only the business can update and delete itself, we need a session and a token to guarantee that who is doing this action is, in fact, the business.

## commonRoutes Example

```ts
import { Router } from 'express';

import BusinessController from '../../controllers/BusinessController';

const businessRouter = Router();
const businessController = new BusinessController();

businessRouter.post('/', businessController.create);
businessRouter.get('/:business_id', businessController.show);
businessRouter.get('/', businessController.index);

export default businessRouter;
```

Here we have an commonRoute from the Business. To create the business we cannot expect that the business exists, and when we show the business to an user, we must be able to search by id or index.

_These code snippets were taken from [session.routes.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/http/routes/session.routes.ts), [businessauth.routes.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/http/routes/authRoutes/businessauth.routes.ts) and [business.routes.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/http/routes/commonRoutes/business.routes.ts) on 08/24/2021._
