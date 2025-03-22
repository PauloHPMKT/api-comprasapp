import { HttpRequest, HttpResponse } from '../types/http';

export abstract class Controller<Request = any> {
  abstract handle(request: HttpRequest<Request>): Promise<HttpResponse>;

  protected validateRequiredFields(
    httpRequest: HttpRequest<Request>,
    requiredFields: string[],
  ) {
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return field;
      }
    }
    return null;
  }
}
