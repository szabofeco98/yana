/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { db, redisClient } from '@yana/db';
import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to first-api!' });
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  await redisClient.set('key', 'value');
  const value = await redisClient.get('key');
  console.log(value);
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
