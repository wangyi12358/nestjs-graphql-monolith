import { HttpException } from '@nestjs/common';

/**
 * business exception class.
 */
export class BusinessException extends HttpException {
  constructor(errorMessage: string) {
    super(errorMessage, 500);
  }
}
