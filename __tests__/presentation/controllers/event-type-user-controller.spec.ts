import app from '@shared/infra/http/config/app';
import createConnection from '@shared/infra/database/typeorm/index';

import request from 'supertest';

import { uuid } from 'uuidv4';
import { Connection, getConnection } from 'typeorm';

import EventTypeUser from '@modules/event/infra/typeorm/entities/EventTypeUser';

let connection: Connection;

interface IEventTypeUser {
  id?: string;
  name: string;
}

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

let eventTypeUser: IEventTypeUser;
let user: IUser;

beforeEach(async () => {
  eventTypeUser = {
    name: 'Festa',
  };
  user = {
    name: 'Henrique Martins',
    email: 'henrique@gmail.com',
    password: 'password_very_strong',
    is_tourist: false,
    small_biography: 'my beaut bio',
    background_photo: null,
  };

  await request(app).post('/api/user').send(user);
});

afterEach(async () => {
  const repository = getConnection().getRepository(EventTypeUser);
  await repository.delete({});
});

describe('Event Type User Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('Should create event type user', async () => {
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .post('/api/EventTypeUser')
      .send(eventTypeUser)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject(eventTypeUser);
  });

  it('Should return the event type user attributes after created', async () => {
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .post('/api/EventTypeUser')
      .send(eventTypeUser)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should return http status code 201 on create event type user', async () => {
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .post('/api/EventTypeUser')
      .send(eventTypeUser)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.statusCode).toEqual(201);
  });

  it('Should return all event types created', async () => {
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const eventTypeUser2: IEventTypeUser = {
      name: 'Velório',
    };

    await request(app)
      .post('/api/EventTypeUser')
      .send(eventTypeUser)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    await request(app)
      .post('/api/EventTypeUser')
      .send(eventTypeUser2)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    const response = await request(app)
      .get('/api/EventTypeUser')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject([eventTypeUser, eventTypeUser2]);
  });

  it(`Should return a message warning that this
      event type user does not exist if there is no such event type`, async () => {
    const sessionResponse = await request(app).post('/api/session').send({
      email: user.email,
      password: user.password,
    });

    const response = await request(app)
      .get(`/api/EventTypeUser/${uuid()}`)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject({
      message: 'Event Type does not exists.',
    });
  });

  it(`Should return http 404 status code
        if there is no event type with this id`, async () => {
    const response = await request(app).get(`/api/EventTypeUser/${uuid()}`);

    expect(response.statusCode).toEqual(404);
  });
});
