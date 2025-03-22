import { HttpRequest, HttpResponse } from '../types/http';

export interface Controller<Request = any> {
  handle: (request: HttpRequest<Request>) => Promise<HttpResponse>;
}
