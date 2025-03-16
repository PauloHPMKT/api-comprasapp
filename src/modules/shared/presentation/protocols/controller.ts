import { HttpRequest, HttpResponse } from './http';

export abstract class Controller {
  abstract handle(httpRequest: HttpRequest): Promise<HttpResponse>;
}
