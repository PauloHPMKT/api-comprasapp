import { ServerError } from '../errors/server-error';
import { HttpResponse } from '../types/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const created = <T = any>(data: T): HttpResponse => ({
  statusCode: 201,
  body: data,
});

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError('Internal server error'),
});
