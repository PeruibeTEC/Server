import { Router } from 'express';

import ResetPasswordController from '../controllers/ResetPasswordController';
import SendForgotPasswordEmailController from '../controllers/SendForgotPasswordEmailController';

const passwordRouter = Router();
const resetPasswordController = new ResetPasswordController();
const sendForgotPasswordEmailController = new SendForgotPasswordEmailController();

passwordRouter.post('/reset', resetPasswordController.create);
passwordRouter.post('/forgot', sendForgotPasswordEmailController.create);

export default passwordRouter;
