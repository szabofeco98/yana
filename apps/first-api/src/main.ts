/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { db, mocksTable, redisClient } from '@yana/dbv2';
import express from 'express';
import * as path from 'path';

const app = express();

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.post('/api', async (req, res) => {
  try {
    const user = await db
      .insert(mocksTable)
      .values({ name: 'test3', age: 10, email: 'test3' });

    return res.json(JSON.stringify(user.fields)).status(201);
  } catch (error) {
    console.error('Error inserting mock:', error);
    return res.json(JSON.stringify(error)).status(500);
  }
});

app.get('/api', async (req, res) => {
  try {
    const user = await db
      .insert(mocksTable)
      .values({ name: 'test3', age: 10, email: 'test3' });

    return res.json(JSON.stringify(user.fields)).status(201);
  } catch (error) {
    console.error('Error inserting mock:', error);
    return res.json(JSON.stringify(error)).status(500);
  }
});

const port = process.env.PORT || 3333;
const server = app.listen(port, async () => {
  await redisClient.set('key', 'value');
  const value = await redisClient.get('key');
  console.log(value);
  const mocks = await db.select().from(mocksTable);
  console.log(mocks);

  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
