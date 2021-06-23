| title            | description                      |
| :-------------:  |:-------------:                   |
| Types of express | Ading types to express request   |

The ./src/@types/express.d.ts file is responsible for adding the user and business attributes inside the express request type. The user and business attributes have a property called id, which is a string (to be more specific, it is a string of a uuid).

## Purpose

By doing this, we are defining that the request will have a user attribute and a business attribute. This is useful to be able to get the id of the user/business that is making the request in some route, so the code is much cleaner and more understandable. An example of this functionality is:

```ts
public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { content, has_photo } = request.body;

    const createPostService = container.resolve(CreatePostService);

    const post = await createPostService.execute({
      content,
      has_photo,
      user_id,
    });

    return response.json(post);
  }
```

As we can see, the code is much clearer, since we don't need to get the user id directly from request.body, to get the id just do a ```const user_id = request.user.id```, very simple and practical. If you want to understand how the process of storing and capturing the id through the JWT token passed in the request works, see the [ensureAuthenticate](https://github.com/PeruibeTEC/Server/blob/main/src/shared/infra/http/middlewares/ensureAuthenticate.ts) documentation, there we explain how this whole process works.


_This code snippet was taken from [PostController.ts](https://github.com/PeruibeTEC/Server/blob/main/src/modules/social/infra/http/controllers/PostController.ts) on 06/22/2021._
