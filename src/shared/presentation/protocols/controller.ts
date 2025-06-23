import { HttpRequest, HttpResponse } from './http';

export abstract class ControllerHandler<Request = any> {
  abstract handle(request: HttpRequest<Request>): Promise<HttpResponse>;

  protected validateRequiredFields(request: HttpRequest<Request>) {
    const requiredFields = Object.keys(request.body || {});
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return field;
      }
    }
    return null;
  }
}
