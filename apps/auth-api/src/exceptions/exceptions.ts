import { CustomError, CustomErrorValue } from '@yana/common';

import { ERROR_CODES } from '../constants/error-codes.constant';

export class EmailOrUsernameAlreadyExists extends CustomError {
  code = ERROR_CODES.EMAIL_OR_USERNAME_ALREADY_EXISTS;
  status = 409;
  errors = [];

  constructor() {
    super('User with this email or username already exists');
    this.name = 'EmailOrUsernameAlreadyExists';
  }
}

export class InvalidCredentialsError extends CustomError {
  code = ERROR_CODES.INVALID_CREDENTIALS;
  status = 401;
  errors: CustomErrorValue[] = [];

  constructor() {
    super('Invalid email or password');
    this.name = 'InvalidCredentialsError';
  }
}
