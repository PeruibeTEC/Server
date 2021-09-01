import app from '@shared/infra/http/config/app';
import createConnection from '@shared/infra/database/typeorm/index';

import request from 'supertest';

import { Connection, getConnection } from 'typeorm';

import Event from '@modules/event/infra/typeorm/entities/EventUser';
import User from '@modules/user/infra/typeorm/entities/User';
import EventType from '@modules/event/infra/typeorm/entities/EventTypeUser';
import { uuid } from 'uuidv4';
import { parseISO } from 'date-fns';

let connection: Connection;

interface IEvent {
  id?: string;
  name: string;
  date: string;
  start_time: string;
  end_time: string;
  description: string;
  user_id: string | undefined;
  event_type_id: string | undefined;
}

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

let event: IEvent;
let eventType: IEventTypeUser;
let user: IUser;
let sessionResponse: any;

beforeEach(async () => {
  eventType = {
    name: 'Festa',
  };

  user = {
    name: 'Henrique Martins',
    email: 'henrique1@gmail.com',
    password: 'password_very_strong',
    is_tourist: false,
    small_biography: 'my beaut bio',
    background_photo: null,
  };

  const responseUser = await request(app).post('/api/user').send(user);

  sessionResponse = await request(app).post('/api/session').send({
    email: user.email,
    password: user.password,
  });

  const responseEventType = await request(app)
    .post('/api/eventtypeuser')
    .send(eventType)
    .auth(sessionResponse.body.token, { type: 'bearer' });

  event = {
    name: 'Festa do Pedro',
    date: '2021-11-10T03:00:00.000Z',
    start_time: '13:00:00',
    end_time: '19:00:00',
    description: 'Festinha do Pedro para comemorar seus 10 anos.',
    user_id: responseUser.body.id,
    event_type_id: responseEventType.body.id,
  };
});

afterEach(async () => {
  const repositoryEventUser = getConnection().getRepository(Event);
  await repositoryEventUser.delete({});

  const repositoryUser = getConnection().getRepository(User);
  await repositoryUser.delete({});

  const repositoryEventTypeUser = getConnection().getRepository(EventType);
  await repositoryEventTypeUser.delete({});
});

describe('Event Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
  });

  afterAll(async () => {
    const myConnection = getConnection();
    await connection.close();
    await myConnection.close();
  });

  it('Should create event', async () => {
    const response = await request(app)
      .post('/api/eventuser')
      .send(event)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject(event);
  });

  it('Should return the event user attributes after created', async () => {
    const response = await request(app)
      .post('/api/eventuser')
      .send(event)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('start_time');
    expect(response.body).toHaveProperty('end_time');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });

  it('Should return http status code 201 on create event user', async () => {
    const response = await request(app)
      .post('/api/eventuser')
      .send(event)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.statusCode).toEqual(201);
  });

  it('Should return all event user created', async () => {
    const event2: IEvent = {
      name: 'Festa do Arthur',
      date: '2021-11-10T03:00:00.000Z',
      start_time: '13:00:00',
      end_time: '19:00:00',
      description: 'Festinha do Arthur para comemorar seus 10 anos.',
      user_id: event.user_id,
      event_type_id: event.event_type_id,
    };

    await request(app)
      .post('/api/eventuser')
      .send(event)
      .auth(sessionResponse.body.token, { type: 'bearer' });
    await request(app)
      .post('/api/eventuser')
      .send(event2)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    const response = await request(app)
      .get('/api/eventuser')
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject([event, event2]);
  });

  it(`Should return a message warning that this
      event user does not exist if there is no such event`, async () => {
    const response = await request(app)
      .get('/api/eventuser/show')
      .send({ id: uuid() })
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject({
      message: 'Event User does not exists.',
    });
  });

  it(`Should return http 404 status code
      if there is no event user with this id`, async () => {
    const response = await request(app)
      .get('/api/eventuser/show')
      .send({ id: uuid() })
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.statusCode).toEqual(404);
  });

  it('Should return a message with the event user id deleted', async () => {
    const eventCreated = await request(app)
      .post('/api/eventuser')
      .send(event)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    const response = await request(app)
      .delete('/api/eventuser')
      .send({ id: eventCreated.body.id })
      .auth(sessionResponse.body.token, { type: 'bearer' });

    expect(response.body).toMatchObject({
      message: `Event ${eventCreated.body.id} deleted `,
    });
  });

  it('Should return updated event user attributes', async () => {
    const fieldsUpdated = {
      name: 'Festa da Mariana',
      description: 'Festa da Mariana para comemorar seus 10 anos.',
      date: '2021-10-11',
    };

    await request(app)
      .post('/api/eventuser')
      .send(event)
      .auth(sessionResponse.body.token, { type: 'bearer' });

    const response = await request(app)
      .put('/api/eventuser')
      .auth(sessionResponse.body.token, { type: 'bearer' })
      .send({
        name: fieldsUpdated.name,
        email: fieldsUpdated.description,
        date: fieldsUpdated.date,
      });

    expect(response.body).toHaveProperty('name');
    expect(response.body).toHaveProperty('date');
    expect(response.body).toHaveProperty('start_time');
    expect(response.body).toHaveProperty('end_time');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('user_id');
    expect(response.body).toHaveProperty('event_type_id');
    expect(response.body).toHaveProperty('created_at');
    expect(response.body).toHaveProperty('updated_at');
  });
});
