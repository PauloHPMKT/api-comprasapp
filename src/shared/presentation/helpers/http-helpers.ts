import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error.message,
});
