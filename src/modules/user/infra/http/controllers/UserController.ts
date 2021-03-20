import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/CreateUserService';
import DeleteUserService from '@modules/user/services/DeleteUserService';
import ShowUserService from '@modules/user/services/ShowUserService';
import UpdateProfileService from '@modules/user/services/UpdateProfileService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, is_tourist } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      is_tourist,
    });

    // @ts-expect-error ⠀⠀⠀
    delete user.password;

    return response.json(user);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const deleteUser = container.resolve(DeleteUserService);

    await deleteUser.execute({ user_id });

    return response.status(200).json({ message: `User ${user_id} deleted ` });
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute({ user_id });
    // @ts-expect-error ⠀⠀⠀
    delete user.password;

    return response.status(200).json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const {
      name,
      email,
      password,
      old_password,
      small_biography,
    } = request.body;

    const updateUser = container.resolve(UpdateProfileService);

    const user = await updateUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
      small_biography,
    });

    // @ts-expect-error ⠀⠀⠀
    delete user.password;

    return response.json(user);
  }
}
