import { AuthenticatedRequest } from './../../../libs/auth/src/lib/interfaces/auth-request.interface';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './../../../libs/auth/src/lib/middleware/authentication.middleware';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import * as path from 'path';

const app = express();
app.use(cookieParser());

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/api', authMiddleware, (req: AuthenticatedRequest, res) => {
  res.send({ message: 'Welcome to post-api!', userId: (req as any).userId });
});

const port = process.env.PORT || 3334;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
