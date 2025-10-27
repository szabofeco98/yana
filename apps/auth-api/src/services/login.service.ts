import { AUTH_SETTINGS } from '@yana/auth';
import { calculateDays, calculateMinutes, DefaultResponse } from '@yana/common';
import { and, db, eq, redisClient, securityUsersTable } from '@yana/dbv2';
import { randomUUID } from 'crypto';
import { Request, Response } from 'express';

import { InvalidCredentialsError, InvalidSessionError } from '../exceptions/exceptions';
import { LoginRequest } from '../interfaces/requests/login-request.interface';
import { TokenValue } from '../interfaces/token/token-value.interface';

export const login = async ({ email, password }: LoginRequest, res: Response): Promise<DefaultResponse> => {
  const userId = await db
    .select({ id: securityUsersTable.id })
    .from(securityUsersTable)
    .where(and(eq(securityUsersTable.email, email), eq(securityUsersTable.password, password)))
    .limit(1);

  if (userId.length === 0) {
    throw new InvalidCredentialsError();
  }
  setCookies(generateTokens(userId[0].id), res);

  return { message: 'Login successful' };
};

export const refreshToken = async (req: Request, res: Response): Promise<DefaultResponse> => {
  const refreshToken = req.cookies[AUTH_SETTINGS.REFRESH_TOKEN];
  const sessionToken = req.cookies[AUTH_SETTINGS.SESSION_TOKEN];
  if (!refreshToken) {
    throw new InvalidSessionError();
  }

  const userId = await redisClient.getDel(`${AUTH_SETTINGS.REFRESH_TOKEN}:${refreshToken}`);
  if (!userId) {
    throw new InvalidSessionError();
  }

  if (sessionToken) {
    await redisClient.del(`${AUTH_SETTINGS.SESSION_TOKEN}:${sessionToken}`);
  }

  setCookies(generateTokens(userId), res);

  return { message: 'Refresh successful' };
};

const setCookies = ({ sessionToken, refreshToken }: TokenValue, res: Response): void => {
  saveCookie(AUTH_SETTINGS.SESSION_TOKEN, sessionToken, res, calculateMinutes(AUTH_SETTINGS.SESSION_TOKEN_EXPIRY_MINUTES));
  saveCookie(AUTH_SETTINGS.REFRESH_TOKEN, refreshToken, res, calculateDays(AUTH_SETTINGS.REFRESH_TOKEN_EXPIRY_DAYS));
};

const generateTokens = (userId: string): TokenValue => {
  const sessionToken = randomUUID();
  const refreshToken = randomUUID();

  redisClient.set(`${AUTH_SETTINGS.SESSION_TOKEN}:${sessionToken}`, userId, {
    PX: calculateMinutes(AUTH_SETTINGS.SESSION_TOKEN_EXPIRY_MINUTES),
  });
  redisClient.set(`${AUTH_SETTINGS.REFRESH_TOKEN}:${refreshToken}`, userId, { PX: calculateDays(AUTH_SETTINGS.REFRESH_TOKEN_EXPIRY_DAYS) });

  return {
    sessionToken,
    refreshToken,
  };
};

const saveCookie = (cookieName: string, cookieValue: string, res: Response, maxAge: number) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true, // can't be accessed via JavaScript
    secure: process.env.NODE_ENV === 'production', // true in production (HTTPS)
    sameSite: 'strict', // protects against CSRF
    maxAge: maxAge,
  });
};
