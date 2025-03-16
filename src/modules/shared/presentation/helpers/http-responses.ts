import { HttpResponse } from '../protocols/http';

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data,
});
