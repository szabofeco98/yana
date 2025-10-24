// middlewares/validate.ts
import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodObject } from 'zod';

import {
  CustomErrorValue,
  InvalidInputError,
} from '../exceptions/exceptions.js';
import { createErrorResponse } from '../utils/response-handler.util.js';

export const validate =
  (schema: ZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse and validate — throws if invalid
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors: CustomErrorValue[] = err.issues.map(
          ({ path, message }) => ({
            path: path.reduce(
              (acc: string, next) =>
                `${acc}${acc ? '.' : ''}${next.toString()}`,
              ''
            ),
            message,
          })
        );

        const error = new InvalidInputError(errors);

        return res.status(error.status).json(createErrorResponse(error));
      }
      next(err);
    }
  };
