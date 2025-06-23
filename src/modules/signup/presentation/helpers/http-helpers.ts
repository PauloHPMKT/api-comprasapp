import { HttpStatus } from '@nestjs/common';

export const badRequest = (error: Error) => ({
  statusCode: HttpStatus.BAD_REQUEST,
  message: error.message,
  error: 'Bad Request',
});
