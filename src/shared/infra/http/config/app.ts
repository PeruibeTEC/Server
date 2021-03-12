import express from 'express';

import 'reflect-metadata';
import '@/shared/container';

import setupMiddlewares from './middlewares';
import setupAppError from './config-app-error';
import setupRoutes from './routes';

const app = express();
setupMiddlewares(app);
setupAppError(app);
setupRoutes(app);

export default app;
