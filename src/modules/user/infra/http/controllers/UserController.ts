import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/User/CreateUserService';
import DeleteUserService from '@modules/user/services/User/DeleteUserService';
import IndexUserService from '@modules/user/services/User/IndexUserService';
import ShowLoggedUserService from '@modules/user/services/User/ShowLoggedUserService';
import UpdateProfileService from '@modules/user/services/User/UpdateProfileService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email,
      password,
      is_tourist,
      small_biography,
      photo,
      background_photo,
    } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      is_tourist,
      small_biography,
      photo,
      background_photo,
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

    const showUser = container.resolve(ShowLoggedUserService);
    const user = await showUser.execute({ user_id });
    // @ts-expect-error ⠀⠀⠀
    delete user.password;

    return response.status(200).json(user);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = container.resolve(IndexUserService);

    const users = await listUser.execute();

    return response.status(200).json(users);
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
