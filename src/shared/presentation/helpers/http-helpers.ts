import { HttpStatus } from '@nestjs/common';
import { HttpResponse } from '../protocols/http';
import { ServerError } from '@/shared/errors/server-error';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatus.BAD_REQUEST,
  body: error.message,
});

export const serverError = (): HttpResponse => ({
  statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  body: new ServerError().message,
});
