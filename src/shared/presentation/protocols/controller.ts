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

  protected validateDeepRequiredFields(
    httpRequest: HttpRequest<Request>,
    requiredFields: string[],
  ) {
    const values = this.nestedPropKeys(httpRequest.body);
    for (const value of values) {
      const deep = { ...value };
      for (const field of requiredFields) {
        if (!deep[field]) {
          return field;
        }
      }
    }

    return null;
  }

  private nestedPropKeys(obj: Record<string, any>) {
    const keys = Object.keys(obj).find(
      (key) => typeof obj[key] === 'object' && obj[key] !== null,
    );
    return keys ? obj[keys] : null;
  }
}
