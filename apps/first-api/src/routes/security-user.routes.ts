import { runServiceOperation, validate } from '@yana/common';
import { Router } from 'express';

import { userRequestSchema } from '../interfaces/requests/user-request.interface';
import { saveUser } from '../services/security-user.service';

const router = Router();

router.post('', validate(userRequestSchema), async (req, res) => {
  runServiceOperation(async () => {
    const user = await saveUser(req.body);
    return user;
  }, res);
});

export default router;
