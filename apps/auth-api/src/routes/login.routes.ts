import { runServiceOperation, validate } from '@yana/common';
import { Router } from 'express';

import { ROUTES } from '../constants/routes.constants';
import { loginRequestSchema } from '../interfaces/requests/login-request.interface';
import { login, refreshToken } from '../services/login.service';

const router = Router();

router.post(`/${ROUTES.LOGIN}`, validate(loginRequestSchema), async (req, res) => {
  runServiceOperation(async () => {
    const response = await login(req.body, res);

    return response;
  }, res);
});

router.post(`/${ROUTES.REFRESH_TOKEN}`, async (req, res) => {
  runServiceOperation(async () => {
    const response = await refreshToken(req, res);

    return response;
  }, res);
});

export default router;
