import { HttpRequest, HttpResponse } from './http';

export abstract class Controller {
  abstract handle(httpRequest: HttpRequest): Promise<HttpResponse>;

  protected validateRequiredFields(
    httpRequest: HttpRequest,
    requiredFields: string[],
  ): string | null {
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return field;
      }
    }
    return null;
  }
}
