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

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data,
});

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: error,
});
