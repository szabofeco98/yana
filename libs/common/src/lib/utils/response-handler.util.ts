import { Response } from 'express';

import { CustomError, InternalServerError } from '../exceptions/exceptions.js';
import { BaseResponse } from '../interfaces/response/base.response.js';

export const runDbOperation = async <T>(
  operation: () => Promise<T>
): Promise<T> => {
  try {
    return await operation();
  } catch (error) {
    throw new InternalServerError();
  }
};

export const runServiceOperation = async <T>(
  operation: () => Promise<T>,
  res: Response
): Promise<void> => {
  try {
    const data = await operation();
    const response: BaseResponse<T> = { data };
    res.json(response);
  } catch (error) {
    if (error instanceof CustomError) {
      res.status(error.status).json(createErrorResponse(error));
    } else {
      const serverError = new InternalServerError();
      res.status(serverError.status).json(createErrorResponse(serverError));
    }
  }
};

export const createErrorResponse = (error: CustomError) => ({
  code: error.code,
  message: error.message,
  errors: error.errors,
});
