import { CustomError } from '@yana/common';

import { ERROR_CODES } from '../constants/error-codes.constants.js';

export class SessionExpiredError extends CustomError {
  errors = [];
  code = ERROR_CODES.SESSION_EXPIRED;
  status = 401;

  constructor() {
    super('Session expired');
    this.name = 'SessionExpiredError';
  }
}
