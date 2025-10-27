import { redisClient } from '@yana/dbv2';
import cookieParser from 'cookie-parser';
import express from 'express';
import * as path from 'path';

import { ROUTES } from './constants/routes.constants';
import loginRoute from './routes/login.routes';
import securityUserRoute from './routes/security-user.routes';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(cookieParser());
app.use(express.json());

app.use(`/${ROUTES.SECURITY_USERS}`, securityUserRoute);

app.use('', loginRoute);

const port = process.env.PORT || 3333;

const server = app.listen(port, async () => {
  await redisClient.set('key', 'value');
  const value = await redisClient.get('key');

  console.log(`Redis test key value: ${value}`);
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
