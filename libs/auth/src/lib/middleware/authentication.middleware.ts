import { AuthenticatedRequest } from './../interfaces/auth-request.interface';
import { createErrorResponse, InternalServerError } from '@yana/common';
import { redisClient } from '@yana/dbv2';
import { NextFunction, Request, Response } from 'express';

import { AUTH_SETTINGS } from '../constants/auth.constants.js';
import { SessionExpiredError } from '../exceptions/exceptions.js';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const sessionToken = req.cookies[AUTH_SETTINGS.SESSION_TOKEN];

  if (!sessionToken) {
    const error = new SessionExpiredError();
    return res.status(error.status).json(createErrorResponse(error));
  }

  // TODO: create a tokens handler util module
  const userId = await redisClient.get(`${AUTH_SETTINGS.SESSION_TOKEN}:${sessionToken}`);
  if (!userId) {
    const error = new InternalServerError();
    return res.status(error.status).json(createErrorResponse(error));
  }

  (req as { userId: string } & Request).userId = userId;

  next();
};
