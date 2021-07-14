import express from 'express';
import bodyParser from 'body-parser';

import 'reflect-metadata';
import 'express-async-errors';

import '../../../container';
import createConnection from '../../database/typeorm';

import setupMiddlewares from './middlewares';
import setupAppError from './config-app-error';
import setupRoutes from './routes';

const app = express();
setupMiddlewares(app);
setupRoutes(app);
setupAppError(app);

// TODO: isolate this method in a separate file
createConnection();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(
  bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
    parameterLimit: 50000,
  }),
);

export default app;
