import express from 'express';

import setupMiddlewares from './middlewares';
import setupAppError from './config-app-error';
import './config-express-async-errors';

const app = express();
setupMiddlewares(app);
setupAppError(app);

export default app;
