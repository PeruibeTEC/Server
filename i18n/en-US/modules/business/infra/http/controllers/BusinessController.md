|        Title        |            Description             |
| :-----------------: | :--------------------------------: |
| Business Controller | Understanding Business Controllers |

The files on ./src/modules/business/infra/http/controllers are used to make changes to the database by creating, deleting, showing or updating it.

## Purpose

By doing this, we can have a cleaner code and each controller method does exactly one action in the database. Here is some examples from the BusinessController.ts controller:

## Create Method

```ts
export default class BusinessController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email_login,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    } = request.body;

    const createBusiness = container.resolve(CreateBusinessService);

    const business = await createBusiness.execute({
      name,
      email_login,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    });

    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.json(business);
  }
}
```

The create method takes info from the business using the request.body. It sends them to the service and executes. Since the response has a password, it is not returned.

## Delete Method

```ts
export default class BusinessController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;

    const deleteBusinessService = container.resolve(DeleteBusinessService);

    await deleteBusinessService.execute({ business_id });

    return response
      .status(200)
      .json({ message: `Business ${business_id} deleted ` });
  }
}
```

The delete method requests an id (usually using session), and sends it to the service. After it executes, the entry is deleted.

## Show Method

```ts
export default class BusinessController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { business_id } = request.params;

    const showBusiness = container.resolve(ShowBusinessService);
    const business = await showBusiness.execute({ business_id });
    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.status(200).json(business);
  }
}
```

The show method gets an id from params, returning an entry when one is found. Since the response has a password, it is not returned.

## Index Method

```ts
export default class BusinessController {
  public async index(request: Request, response: Response): Promise<Response> {
    const indexBusinessService = container.resolve(IndexBusinessService);

    const business = await indexBusinessService.execute();

    return response.status(200).json(business);
  }
}
```

The index method does the same thing as the show method, but doesn't need an id.

## Update Method

```ts
export default class BusinessController {
  public async update(request: Request, response: Response): Promise<Response> {
    const business_id = request.business.id;
    const {
      name,
      email_login,
      old_password,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
    } = request.body;

    const updateBusinessService = container.resolve(UpdateBusinessService);

    const business = await updateBusinessService.execute({
      name,
      email_login,
      old_password,
      password,
      description,
      profile_photo,
      background_photo,
      operating_time,
      closing_time,
      closing_day,
      business_type_id,
      business_id,
    });

    // @ts-expect-error ⠀⠀⠀
    delete business.password;

    return response.json(business);
  }
}
```

The update method works similarly to the create method, tanking info from request.body and executing. Since the response has a password, it is not returned.

As a general rule, all controllers have the imports at the top, importing from dependencies such as request, response and the container. After that we import the services. As we can see, all methods use the services that were imported at the top and are inside the `export default class BusinessController` form.

_These codes snippets were taken from [BusinessController.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/business/infra/http/controllers/BusinessController.ts) on 07/13/2021._
