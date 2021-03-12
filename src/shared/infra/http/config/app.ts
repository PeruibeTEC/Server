import express from 'express';

import 'reflect-metadata';
import 'express-async-errors';

import '@/shared/container';
import '@/shared/infra/database/typeorm';

import setupMiddlewares from './middlewares';
import setupAppError from './config-app-error';
import setupRoutes from './routes';

const app = express();
setupMiddlewares(app);
setupRoutes(app);
setupAppError(app);

export default app;
