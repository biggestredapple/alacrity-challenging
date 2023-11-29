import httpStatus from 'http-status';

import { CustomError } from './CustomError';

export class InValidKeyError extends CustomError {
  constructor(message: string, reasonCode?: string) {
    super(message, httpStatus.BAD_REQUEST, reasonCode);
  }
}
