import { ERROR_CODES } from '../constants/error-codes.constant.js';

export interface CustomErrorValue {
  readonly path: string;
  readonly message: string;
}

export abstract class CustomError extends Error {
  abstract code: string;
  abstract status: number;
  abstract errors?: CustomErrorValue[];
}

export class InternalServerError extends CustomError {
  errors = [];
  code = ERROR_CODES.INTERNAL_SERVER_ERROR;
  status = 500;

  constructor() {
    super('An internal server error occurred');
    this.name = 'InternalServerError';
  }
}

export class InvalidInputError extends CustomError {
  errors: CustomErrorValue[];
  code = ERROR_CODES.INVALID_USER_INPUT;
  status = 400;
  constructor(errors: CustomErrorValue[]) {
    super('Invalid user input');
    this.name = 'InvalidInputError';
    this.errors = errors;
  }
}
