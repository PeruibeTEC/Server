import app from '@shared/infra/http/config/app';
import createConnection from '@shared/infra/database/typeorm/index';

import request from 'supertest';

import { uuid } from 'uuidv4';
import { Connection, getConnection } from 'typeorm';

import User from '@modules/user/infra/typeorm/entities/User';

let connection: Connection;

interface IUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  is_tourist: boolean;
  small_biography?: string;
  photo?: 'https://peruibetec.blob.core.windows.net/user-images/default.jpg';
  background_photo?: string | null;
}

let user: IUser;

beforeEach(() => {
  user = {
    name: 'Henrique Martins',
    email: 'henrique@gmail.com',
    password: 'password_very_strong',
    is_tourist: false,
    small_biography: 'my beaut bio',
    background_photo: null,
  };
});

afterEach(async () => {
  const repository = getConnection().getRepository(User);
  await repository.delete({});
});

describe('User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('Should create user', async () => {
    const response = await request(app).post('/api/user').send(user);

    // @ts-expect-error ⠀⠀⠀
    delete user.password;
    expect(response.body).toMatchObject(user);
  });

  it('Should return the user attributes after created', async () => {
    const response = await request(app).post('/api/user').send(user);

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('is_tourist');
    expect(response.body).toHaveProperty('small_biography');
    expect(response.body).toHaveProperty('background_photo');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should return http status code 201 on create user', async () => {
    const response = await request(app).post('/api/user').send(user);

    expect(response.statusCode).toEqual(201);
  });

  it('Should return all users created', async () => {
    const user2: IUser = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password_very_strong',
      is_tourist: true,
      small_biography: 'i love peruibe',
      background_photo: null,
    };

    await request(app).post('/api/user').send(user);
    await request(app).post('/api/user').send(user2);
    const response = await request(app).get('/api/user');

    // @ts-expect-error ⠀⠀⠀
    delete user.password;
    // @ts-expect-error ⠀⠀⠀
    delete user2.password;

    expect(response.body).toMatchObject([user, user2]);
  });

  it('Should return the user who made a request', async () => {
    const userCreated = await request(app).post('/api/user').send(user);
    const response = await request(app).get(`/api/user/${userCreated.body.id}`);

    // @ts-expect-error ⠀⠀⠀
    delete user.password;

    expect(response.body).toMatchObject({ user });
  });

  it(`Should return a message warning that this 
      user does not exist if there is no such user`, async () => {
    const response = await request(app).get(`/api/user/${uuid()}`);

    expect(response.body).toMatchObject({ message: 'User does not exists.' });
  });

  it(`Should return http 404 status code 
      if there is no user with this id`, async () => {
    const response = await request(app).get(`/api/user/${uuid()}`);

    expect(response.statusCode).toEqual(404);
  });

  it('Should return a message with the user id deleted', async () => {
    const userCreated = await request(app).post('/api/user').send(user);
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .delete('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject({
      message: `User ${userCreated.body.id} deleted `,
    });
  });

  it(`Should return a message warning that this user
      does not exist if the token is not related to any user`, async () => {
    await request(app).post('/api/user').send(user);
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    await request(app)
      .delete('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    const response = await request(app)
      .delete('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject({ message: 'User does not exists.' });
  });

  it(`Should return http 404 status code 
      if there is no user with this token jwt`, async () => {
    await request(app).post('/api/user').send(user);
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    await request(app)
      .delete('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    const response = await request(app)
      .delete('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.statusCode).toEqual(404);
  });

  it('Should return updated user attributes', async () => {
    const fieldsUpdated = {
      name: 'John Does',
      email: 'johndoe@gmail.com',
    };

    await request(app).post('/api/user').send(user);
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .put('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' })
      .send({ name: fieldsUpdated.name, email: fieldsUpdated.email });

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('email');
    expect(response.body).toHaveProperty('is_tourist');
    expect(response.body).toHaveProperty('small_biography');
    expect(response.body).toHaveProperty('background_photo');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  // FIXME: I ended up doing some tests that would be better suited to testing the services, I'll leave them here for whatever developer develops the tests for the services

  it(`Should return a warning when the
      updated email is already in use`, async () => {
    const user2: IUser = {
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: 'password_very_strong',
      is_tourist: true,
      small_biography: 'i love peruibe',
      background_photo: null,
    };

    const newUser = {
      name: 'John Does',
      email: 'johndoe@gmail.com',
    };

    await request(app).post('/api/user').send(user);
    await request(app).post('/api/user').send(user2);
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .put('/api/user/profile')
      .auth(sessionResponse.body.token, { type: 'bearer' })
      .send({ name: newUser.name, email: user2.email });

    expect(response.statusCode).toEqual(409);
    expect(response.body).toMatchObject({ message: 'E-mail already in use.' });
  });
});
