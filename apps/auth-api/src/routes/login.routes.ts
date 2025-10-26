import { runServiceOperation, validate } from '@yana/common';
import { Router } from 'express';

import { loginRequestSchema } from '../interfaces/requests/login-request.interface';
import { login } from '../services/login.service';

const router = Router();

router.post('', validate(loginRequestSchema), async (req, res) => {
  runServiceOperation(async () => {
    const response = await login(req.body, res);

    return response;
  }, res);
});

export default router;
