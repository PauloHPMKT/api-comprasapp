import { HttpRequest, HttpResponse } from '@/shared/presentation/types/http';

export class SignupController {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param ${field}`),
        };
      }
    }
  }
}
